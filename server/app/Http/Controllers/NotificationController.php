<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index (User $user) {
        $notifications = $user->notifications;

        $user->unreadNotifications()->update(['read_at' => now()]);

        return $notifications;
    }
}
