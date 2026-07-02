<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['title', 'description', 'category', 'file_type', 'size_or_duration', 'author', 'url', 'download_count'])]
class Document extends Model
{
    //
}
