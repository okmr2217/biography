<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('followings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('follower_id')->constrained('users'); // from
            $table->foreignId('followee_id')->constrained('users'); // to
            $table->timestamps();

            $table->unique(['follower_id', 'followee_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('followings');
    }
};
