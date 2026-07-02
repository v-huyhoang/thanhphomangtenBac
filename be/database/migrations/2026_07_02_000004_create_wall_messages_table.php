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
        Schema::create('wall_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('school', 255);
            $table->text('message');
            $table->integer('likes')->default(0);
            $table->integer('color_index')->default(0);
            $table->string('status', 50)->default('approved'); // default to approved as per schema details
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wall_messages');
    }
};
