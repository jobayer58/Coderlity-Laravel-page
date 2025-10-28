<?php

namespace App\Models\Frontend;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class SubMenu extends Model
{
    use HasFactory;

    public function menuInfo()
    {
        return $this->belongsTo(Menu::class, 'menu_id');
    }
}
