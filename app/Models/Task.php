<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Task extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'list_id',
        'title',
        'notes',
        'due_date',
        'status',
        'priority',
    ];

    protected $casts = [
        'status'   => 'string',    // Enum in DB
        'priority' => 'string',  // Enum in DB
        'due_date' => 'datetime',
    ];

    // Relationships
    public function list(): BelongsTo
    {
        return $this->belongsTo(ListModel::class, 'list_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'task_tag', 'task_id', 'tag_id');
    }
}