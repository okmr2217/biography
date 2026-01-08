<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Request;

class RoomController extends Controller
{   
    public function index (User $user) {
        return $user->rooms->append('unread_messages_count');
    }

    public function show (Room $room) {
        return $room;
    }

    public function store (Request $request, User $user) {
        $room = new Room();
        $room->save();

        $room->users()->attach([$user->id, ...$request->users]);

        return $room;
    }

    public function destroy (Room $room) {
        $room->delete();

        return response('');
    }
}
