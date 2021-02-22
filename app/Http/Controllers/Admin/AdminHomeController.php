<?php

namespace App\Http\Controllers\Admin;

use Auth;
use App\Models\Job;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Http\Request;
use App\Repositories\UserRepo;
use App\Http\Controllers\Controller;

class AdminHomeController extends Controller
{

    public function __construct(){
        $this->middleware('auth:admin')
            ->except('login','adminLogin');
    }

    public function login(){
        return Inertia::render('admin/auth/login');
    }

    public function logout(){
        auth()->guard('admin')->logout();

        return redirect()->route('admin.login');
    }

    public function adminLogin() {
       
        if(Auth::guard('admin')->attempt(request()->only('email','password'),request()->filled('remember'))){
        //Authentication passed...
        return redirect()
            ->intended(route('admin.home'));
        }

        return redirect()->back()->withStatus('error','Invalid Credentials');
    }

    public function home(){

        $jobs = Job::paginate();

        return Inertia::render('admin/home',[
            'jobs' => $jobs
        ]);
    }

    public function searchCandidate(){

        
        $users = (new UserRepo)->search();

        $users = $users->paginate();

        return Inertia::render('admin/user/search',[
            'users' => $users,
            'filters' => request()->all()
        ]);

    }

}
