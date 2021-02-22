<?php

namespace App\Repositories;

use App\Models\User;

class UserRepo {

	public function search(){
		$users = User::with(['experience', 'education']);

        $users->where(function() use($users) {

            if(request()->name){
                $users->orWhere('name', 'like','%'.request()->name.'%');
            }

            if(request()->email){
                $users->orWhere('email', 'like','%'.request()->email.'%');
            }

            if(request()->title || request()->skills || request()->industry){
                $users->whereHas('experience', function($q){
                    $q->where(function($query){
                        if(request()->title){
                            $query->orWhere('title', 'like', '%'.request()->title.'%');
                        }

                        if(request()->skills){
                            $query->orWhere('skills', 'like', '%'.request()->skills.'%');
                        }
                        if(request()->industry){
                            $query->orWhere('industry', 'like', '%'.request()->industry.'%');
                        }

                    });
                });
            }

            if(request()->education){
                $users->whereHas('education', function($q){
                    $q->where('highest_qualification', 'like','%'.request()->education.'%');

                });
            }

        });

        return $users;
	}
}

?>