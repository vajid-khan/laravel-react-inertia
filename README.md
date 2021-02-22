<h2>Basic Job Site</h2>

<ol>
  <li>
    <b>Front end</b> display/search jobs/manage profile. Users can register, login, create profile, upload cv, apply to job
  </li>
  <li>
    <b>Admin panel</b> to create/edit/list jobs view applicants on jobs, search users, graph of user registrations <br />
  </li>
</ol>

<h2>SETUP</h2>
<ol>
  <li>
    composer install
  </li>
  <li>
    npm install && npm run dev
  </li>
  <li>
  	Seed Jobs Table
  	php artisan job:seed
  </li>

  <li>
  	if images are not visible, delete storage folder from public and run
  	php artisan storage:link
  </li>
</ol>
