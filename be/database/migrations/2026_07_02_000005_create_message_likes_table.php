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
        Schema::create('message_likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('message_id')
                  ->constrained('wall_messages')
                  ->onDelete('cascade');
            $table->string('user_ip', 45); // IPv4 or IPv6 address
            $table->timestamps();

            // Unique constraint to ensure an IP can only like a message once
            $table->unique(['message_id', 'user_ip'], 'unique_message_ip_like');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('message_likes');
    }
};
