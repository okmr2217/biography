<?php

namespace App\Models;

use App\Casts\DiffForHumans;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    use HasFactory;

    protected $with = ['user'];

    protected $appends = ['children_count', 'likers_count', 'like'];

    protected $casts = [
        'created_at' => DiffForHumans::class,
    ];

    protected function imageFile(): Attribute {
        return Attribute::make(
            get: fn (string|null $value) => $value ? config('app.url').'/storage/'.$value : null
        );
    }

    public function getLikeAttribute() {
        return $this->likers()->where('user_id', Auth::user()->id)->first();
    }

    public function getChildrenCountAttribute() {
        return $this->children()->count();
    }

    public function getLikersCountAttribute() {
        return $this->likers()->count();
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function children(): HasMany {
        return $this->hasMany(self::class, 'parent_id');
    }

    public function parent(): BelongsTo {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function likers(): BelongsToMany {
        return $this->BelongsToMany(User::class, 'likes');
    }
}
