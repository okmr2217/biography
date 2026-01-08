<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
use App\Models\Message;
use App\Models\Room;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index (Request $request, Room $room) {
        $messages = $room->messages()->orderBy('created_at')->get();

        $room->unreadMessages()->update(['read_at' => now()]);

        return $messages;
    }

    public function store (Request $request, Room $room) {
        $message = new Message();
        $message->user_id = $request->user()->id;
        $message->text = $request->text;
        $room->messages()->save($message);

        broadcast(new NewMessage($message));

        return $message;
    }
}
