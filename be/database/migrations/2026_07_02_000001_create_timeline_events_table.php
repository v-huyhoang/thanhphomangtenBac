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
        Schema::create('timeline_events', function (Blueprint $table) {
            $table->id();
            $table->string('year', 10);
            $table->string('title', 255);
            $table->string('tag', 100);
            $table->text('description');
            $table->string('badge', 100);
            $table->text('details');
            $table->string('image', 512)->nullable();
            $table->string('link_label', 255)->nullable();
            $table->string('link_url', 512)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timeline_events');
    }
};
