<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use App\Notifications\Liked;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function like (Request $request, User $user) {
        $post = Post::find($request->post_id);
        $author = User::find($post->user_id);

        $user->likes()->attach($post->id);

        $author->notify(new Liked($user, $post));

        return response('');
    }

    public function unlike (Request $request, User $user) {
        $user->likes()->detach($request->post_id);

        return response('');
    }

    public function likers (Post $post) {
        return $post->likers;
    }
}
