<?php

namespace App\Console\Commands;

use App\Models\Job;
use App\Models\Admin;
use Illuminate\Console\Command;

class Setup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'run:setup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed DB for application';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        dump('SEEDING JOBS TABLE');     
        Job::factory()->count(30)->create();
        dump('JOBS SEEDING COMPLETE');

        dump('CREATING DEFAULTADMIN');
        Admin::create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('secret')
        ]);

        return 0;
    }
}
