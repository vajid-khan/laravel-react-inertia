<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Inertia\Inertia;
use App\Models\UserJob;
use Illuminate\Http\Request;
use App\Models\UserEducation;
use App\Models\UserExperience;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth')->except('index');
    }

    public function index(){
        return Inertia::render('welcome');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function home()
    {
        $education = auth()->user()->education;
        $experience = auth()->user()->experience; 

        return Inertia::render('user/home', [
            'education' => $education,
            'experience' => $experience,
        ]);

    }

    public function profile(){
        
        $user = auth()->user();
        $user->name = request()->name;
        $user->mobile = request()->mobile;

        if(request()->hasFile('profile')){
            $user->profile_pic = request()->file('profile')->store('profile', 'public');
        }

        if(request()->hasFile('cv')){
            $user->cv_url = request()->file('cv')->store('cv', 'public');
        }

        $user->save();

        UserExperience::updateOrCreate([
            'user_id' => $user->id
        ],[
            'title' => request()->title,
            'company_name' => request()->company_name,
            'skills' => request()->skills,
            'industry' => request()->industry,
            'date_started' => request()->date_started,
        ]);

        UserEducation::updateOrCreate([
            'user_id' => $user->id
        ],[
            'school' => request()->school,
            'highest_qualification' => request()->highest_qualification,
            'date_completed' => request()->date_completed,
        ]);

        return redirect()->back()->with('success', 'Profile Updated Successfully');;

    }

    public function searchJob() {

        $query = request()->search;

        $jobs = Job::query();

        if($query){
            $jobs->where('title', 'LIKE', "%$query%")
                ->orWhere('company_name', 'LIKE', "%$query%");
        }

        $jobs = $jobs->paginate();
        
        $appliedJobs = UserJob::where('user_id', auth()->user()->id)
            ->get();

        return Inertia::render('user/searchJob',[
            'jobs' => $jobs,
            'search' => $query,
            'appliedJobs' => $appliedJobs
        ]);
        
    }

    public function applyJob(Job $job){
        
        UserJob::create([
            'job_id' => $job->id,
            'user_id' => auth()->user()->id,
            'applied_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Applied Successfully');
        
    }

}
