<?php

namespace App\Models\Frontend;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Menu extends Model
{
    use HasFactory;
  public function subMenuList()
    {
        return $this->hasMany(SubMenu::class, 'menu_id');
    }
}
