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
        Schema::create('leaderboard', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('school', 255);
            $table->integer('score');
            $table->integer('time_in_seconds');
            $table->timestamps();

            // Create composite index for ranking retrieval
            $table->index(['score', 'time_in_seconds'], 'idx_leaderboard_performance');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leaderboard');
    }
};
