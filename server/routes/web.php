<?php

use App\Http\Controllers\FollowingController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\UserController;
use App\Models\Following;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::prefix('/api')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user()->append([
            'unread_notifications_count',
            'unread_messages_count'
        ]);
    });

    Route::apiResource('users', UserController::class)->only(['index', 'show', 'update']);
    Route::apiResource('posts', PostController::class)->only(['index', 'show', 'store', 'destroy']);

    Route::post('/users/{user}/like', [LikeController::class, 'like']);
    Route::post('/users/{user}/unlike', [LikeController::class, 'unlike']);

    Route::get('/posts/{post}/likers', [LikeController::class, 'likers']);
    
    Route::post('/users/{user}/follow', [FollowingController::class, 'follow']);
    Route::post('/users/{user}/unfollow', [FollowingController::class, 'unfollow']);

    Route::get('/users/{user}/followings', [FollowingController::class, 'followings']);
    Route::get('/users/{user}/followers', [FollowingController::class, 'followers']);

    Route::get('/users/{user}/notifications', [NotificationController::class, 'index']);

    Route::apiResource('users.rooms', RoomController::class)->shallow()->only(['index', 'show', 'store', 'destroy']);

    Route::apiResource('rooms.messages', MessageController::class)->shallow()->only(['index', 'store']);
});

require __DIR__.'/auth.php';
