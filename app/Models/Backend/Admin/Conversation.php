<?php

namespace App\Models\Backend\Admin;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Conversation extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_id',
        'user_id',
        'role_type',
        'message',
        'message_seen',
        'message_type',
        'message_time',
    ];
}
 