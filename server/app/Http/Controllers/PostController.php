<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index (Request $request) {
        $parent_id = $request->parent_id;
        $text = $request->text;

        return Post::orderBy('created_at', 'desc')
            ->whereNull('parent_id')
            ->when($text, function ($query) use ($text) {
                $query->where('text', 'like', "%{$text}%");
            })
            ->when($parent_id, function ($query) use ($parent_id) {
                $query->where('parent_id', $parent_id);
            })
            ->get();
    }

    public function show (Request $request, Post $post) {
        return [
            'post' => $post,
            'children' => $post->children
        ];
    }

    public function store(Request $request) {
        $image_file = $request->file('image_file');

        $post = new Post();
        $post->user_id = $request->user()->id;
        $post->text = $request->text;
        $post->parent_id = $request->parent_id;
        if ($image_file) {
            $post->image_file = $image_file[0]->store('images', 'public');
        }
        $post->save();

        return $post;
    }

    public function destroy (Post $post) {
        $post->delete();
        
        return response('');
    }
}
