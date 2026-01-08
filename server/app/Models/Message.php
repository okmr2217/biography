<?php

namespace App\Models;

use App\Casts\DiffForHumans;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory;

    protected $with = ['user'];

    protected $casts = [
        'created_at' => DiffForHumans::class,
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
