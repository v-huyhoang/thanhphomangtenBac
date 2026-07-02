<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Leaderboard;
use App\Models\MessageLike;
use App\Models\QuizQuestion;
use App\Models\TimelineEvent;
use App\Models\WallMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ApiController extends Controller
{
    /**
     * Get timeline events.
     */
    public function timeline(): JsonResponse
    {
        $events = TimelineEvent::orderBy('year', 'asc')->get()->map(function ($event) {
            return [
                'id' => $event->id,
                'year' => $event->year,
                'title' => $event->title,
                'description' => $event->description,
                'badge' => $event->badge,
                'details' => $event->details,
                'tag' => $event->tag,
                'image' => $event->image,
                'link' => $event->link_label ? [
                    'label' => $event->link_label,
                    'url' => $event->link_url,
                ] : null,
            ];
        });

        return response()->json($events);
    }

    /**
     * Get random quiz questions.
     */
    public function quiz(): JsonResponse
    {
        $questions = QuizQuestion::inRandomOrder()->get()->map(function ($q) {
            return [
                'id' => $q->id,
                'question' => $q->question,
                'options' => $q->options,
                'correctAnswerIndex' => $q->correct_answer,
                'explanation' => $q->explanation,
                'category' => $q->category,
            ];
        });

        return response()->json($questions);
    }

    /**
     * Get leaderboard top entries.
     */
    public function leaderboard(): JsonResponse
    {
        $entries = Leaderboard::orderBy('score', 'desc')
            ->orderBy('time_in_seconds', 'asc')
            ->limit(10)
            ->get()
            ->map(function ($entry) {
                return [
                    'name' => $entry->school ? "{$entry->name} ({$entry->school})" : "{$entry->name} (Sinh viên)",
                    'score' => $entry->score,
                    'date' => $entry->created_at->format('d/m/Y'),
                ];
            });

        return response()->json($entries);
    }

    /**
     * Submit score to leaderboard.
     */
    public function storeLeaderboard(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'school' => 'nullable|string|max:255',
            'score' => 'required|integer|min:0',
            'time_in_seconds' => 'required|integer|min:0',
        ]);

        $entry = Leaderboard::create([
            'name' => $validated['name'],
            'school' => $validated['school'] ?? 'Sinh viên',
            'score' => $validated['score'],
            'time_in_seconds' => $validated['time_in_seconds'],
        ]);

        // Get top 10 and mark user's entry
        $entries = Leaderboard::orderBy('score', 'desc')
            ->orderBy('time_in_seconds', 'asc')
            ->limit(10)
            ->get()
            ->map(function ($item) use ($entry) {
                return [
                    'name' => $item->school ? "{$item->name} ({$item->school})" : "{$item->name} (Sinh viên)",
                    'score' => $item->score,
                    'date' => $item->created_at->format('d/m/Y'),
                    'isUser' => $item->id === $entry->id,
                ];
            });

        return response()->json($entries);
    }

    /**
     * Get messages with filters and user-liked states.
     */
    public function messages(Request $request): JsonResponse
    {
        Carbon::setLocale('vi');
        $sortBy = $request->query('sort_by', 'newest');
        $userIp = $request->ip();

        $query = WallMessage::where('status', 'approved');

        if ($sortBy === 'likes') {
            $query->orderBy('likes', 'desc')->orderBy('created_at', 'desc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $messages = $query->get()->map(function ($msg) use ($userIp) {
            $likedByUser = $msg->messageLikes()->where('user_ip', $userIp)->exists();

            return [
                'id' => (string) $msg->id,
                'name' => $msg->name,
                'school' => $msg->school,
                'message' => $msg->message,
                'timestamp' => $msg->created_at->diffForHumans(),
                'likes' => $msg->likes,
                'likedByUser' => $likedByUser,
                'colorIndex' => $msg->color_index,
            ];
        });

        return response()->json($messages);
    }

    /**
     * Send wall message.
     */
    public function storeMessage(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'school' => 'nullable|string|max:255',
            'message' => 'required|string|max:250',
            'color_index' => 'required|integer',
        ]);

        $msg = WallMessage::create([
            'name' => $validated['name'],
            'school' => $validated['school'] ?? 'Sinh viên TP.HCM',
            'message' => $validated['message'],
            'color_index' => $validated['color_index'],
            'likes' => 0,
            'status' => 'approved',
        ]);

        return response()->json([
            'id' => (string) $msg->id,
            'name' => $msg->name,
            'school' => $msg->school,
            'message' => $msg->message,
            'timestamp' => 'Vừa xong',
            'likes' => 0,
            'likedByUser' => false,
            'colorIndex' => $msg->color_index,
        ]);
    }

    /**
     * Like/Unlike toggle wall message.
     */
    public function likeMessage(Request $request, string $id): JsonResponse
    {
        $message = WallMessage::findOrFail($id);
        $userIp = $request->ip();

        $like = MessageLike::where('message_id', $id)->where('user_ip', $userIp)->first();

        if ($like) {
            $like->delete();
            $message->decrement('likes');
            $liked = false;
        } else {
            MessageLike::create([
                'message_id' => $id,
                'user_ip' => $userIp,
            ]);
            $message->increment('likes');
            $liked = true;
        }

        return response()->json([
            'likes' => $message->likes,
            'likedByUser' => $liked,
        ]);
    }

    /**
     * Get and search documents.
     */
    public function documents(Request $request): JsonResponse
    {
        $category = $request->query('category', 'Tất cả');
        $search = $request->query('search', '');

        $query = Document::query();

        if ($category !== 'Tất cả') {
            $query->where('category', $category);
        }

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('author', 'like', "%{$search}%");
            });
        }

        $docs = $query->get()->map(function ($doc) {
            return [
                'id' => $doc->id,
                'title' => $doc->title,
                'description' => $doc->description,
                'category' => $doc->category,
                'fileType' => $doc->file_type,
                'sizeOrDuration' => $doc->size_or_duration,
                'author' => $doc->author,
                'url' => $doc->url,
                'downloadCount' => $doc->download_count,
            ];
        });

        return response()->json($docs);
    }

    /**
     * Record document download count increment.
     */
    public function downloadDocument(string $id): JsonResponse
    {
        $doc = Document::findOrFail($id);
        $doc->increment('download_count');

        return response()->json([
            'id' => $doc->id,
            'downloadCount' => $doc->download_count,
        ]);
    }
}
