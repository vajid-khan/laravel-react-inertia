<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserExperience extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'title', 'company_name', 'skills', 'industry', 'date_started'
    ];

    public function setDateStartedAttribute($value)
    {
        $this->attributes['date_started'] = Carbon::parse($value)->format('Y-m-d');
    }

}
