<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;

class Room extends Model
{
    use HasFactory;

    protected $with = ['users'];

    public function getUnreadMessagesCountAttribute() {
        return $this->messages()
        ->where('user_id', '<>', Auth::user()->id)
        ->whereNull('read_at')->count();
    }

    public function unreadMessages(): HasMany {
        return $this->messages()
        ->where('user_id', '<>', Auth::user()->id)
        ->whereNull('read_at');
    }

    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class);
    }

    public function messages(): HasMany {
        return $this->hasMany(Message::class);
    }
}
