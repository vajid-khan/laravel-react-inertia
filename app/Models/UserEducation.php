<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserEducation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'highest_qualification', 'school', 'date_completed'
    ];

    public function setDateCompletedAttribute($value)
    {
        $this->attributes['date_completed'] = Carbon::parse($value)->format('Y-m-d');
    }
    
}
