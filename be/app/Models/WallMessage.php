<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name', 'school', 'message', 'likes', 'color_index', 'status'])]
class WallMessage extends Model
{
    /**
     * Get the individual likes for the message.
     */
    public function messageLikes(): HasMany
    {
        return $this->hasMany(MessageLike::class, 'message_id');
    }
}
