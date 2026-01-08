<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected function iconFile(): Attribute {
        return Attribute::make(
            get: fn (string|null $value) => $value ? config('app.url').'/storage/'.$value : null
        );
    }

    public function getUnreadMessagesCountAttribute() {
        return Message::whereIn('room_id', $this->rooms->pluck('id'))
        ->where('user_id', '<>', Auth::user()->id)
        ->whereNull('read_at')->count();
    }

    public function getPostsCountAttribute() {
        return $this->posts()->count();
    }

    public function getFollowingsCountAttribute() {
        return $this->followings()->count();
    }

    public function getFollowersCountAttribute() {
        return $this->followers()->count();
    }

    public function getRoomAttribute() {
        return $this->rooms()
        ->whereHas('users', function (Builder $query) {
            $query->where('user_id', Auth::user()->id);
        })
        ->first();
    }

    # 認証済ユーザーがこのユーザーをフォロー済であればFollowオブジェクトを返す
    public function getFollowingAttribute() {
        return $this->hasMany(Following::class, 'followee_id')
            ->where('follower_id', Auth::user()->id)
            ->first();
    }

    public function getUnreadNotificationsCountAttribute() {
        return $this->unreadNotifications()->count();
    }

    public function posts(): HasMany {
        return $this->hasMany(Post::class);
    }

    public function followings(): BelongsToMany {
        return $this->belongsToMany(self::class, 'followings', 'follower_id', 'followee_id');
    }

    public function followers(): BelongsToMany {
        return $this->belongsToMany(self::class, 'followings', 'followee_id', 'follower_id');
    }

    public function likes(): BelongsToMany {
        return $this->BelongsToMany(Post::class, 'likes');
    }

    public function rooms(): BelongsToMany {
        return $this->belongsToMany(Room::class);
    }
}
