<?php

namespace App\Http\Controllers;

use App\Models\Following;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index (Request $request) {
        $name = $request->name;

        return User::orderBy('created_at', 'desc')
            ->when($name, function ($query) use ($name) {
                $query->where('name', 'like', "%{$name}%");
            })
            ->get();
    }

    public function show (User $user) {
        return [
            'user' => $user->append([
                'posts_count',
                'followings_count',
                'followers_count',
                'room',
                'following'
            ]),
            'posts' => $user->posts
        ];
    }

    public function update (Request $request, User $user) {
        $icon_file = $request->file('icon_file');

        $user->name = $request->name;
        $user->bio = $request->bio;
        if ($icon_file) {
            $user->icon_file = $icon_file[0]->store('icons', 'public');
        }
        $user->save();

        return $user;
    }
}
