<h2>Basic Job Site</h2>

<ol>
  <li>
    <b>Front end</b> display/search jobs/manage profile. Users can register, login, create profile, upload cv, apply to job
    <p>
    Minimum user fields: Name, Email, Mobile, CV_Text <br />
    User work experience: Job Title, Company, Date Started, Industry (use only these drop downs: Hospitality, Engineering, Others) <br />
    User education: Hightest level, School, Date Completed  <br />
    User skills: Name
    </p>

  </li>
  <li>
    <b>Admin panel</b> to create/edit/list jobs view applicants on jobs, search users, graph of user registrations <br />
    <p>
      Minimum job fields: Company Name, Job Title, Job Description </br />
      Minimum cv search filter: search by Name, by email, by job title, by education highest level, by skill, by industry
    </p>
  </li>
</ol>

<b>Use Angular for front end, Laravel for backend </b>

 <p>
  Should you require additional fields, these must only be for login/session/key/search requirements only (eg: passwords, created_date, updated_date)
 </p>

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
