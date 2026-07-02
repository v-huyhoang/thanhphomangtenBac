<?php

use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Route;

Route::get('/timeline', [ApiController::class, 'timeline']);
Route::get('/quiz', [ApiController::class, 'quiz']);

Route::get('/leaderboard', [ApiController::class, 'leaderboard']);
Route::post('/leaderboard', [ApiController::class, 'storeLeaderboard']);

Route::get('/messages', [ApiController::class, 'messages']);
Route::post('/messages', [ApiController::class, 'storeMessage']);
Route::post('/messages/{id}/like', [ApiController::class, 'likeMessage']);

Route::get('/documents', [ApiController::class, 'documents']);
Route::post('/documents/{id}/download', [ApiController::class, 'downloadDocument']);
