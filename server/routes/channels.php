<?php

use App\Models\Room;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('rooms.{roomId}', function (User $user, int $roomId) {
    $room = Room::find($roomId);

    return $room->users->pluck('id')->contains($user->id);
});
