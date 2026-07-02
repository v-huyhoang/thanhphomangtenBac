<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['year', 'title', 'tag', 'description', 'badge', 'details', 'image', 'link_label', 'link_url'])]
class TimelineEvent extends Model
{
    //
}
