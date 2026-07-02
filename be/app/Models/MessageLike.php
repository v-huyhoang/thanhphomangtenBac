<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['message_id', 'user_ip'])]
class MessageLike extends Model
{
    /**
     * Get the message that was liked.
     */
    public function wallMessage(): BelongsTo
    {
        return $this->belongsTo(WallMessage::class, 'message_id');
    }
}
