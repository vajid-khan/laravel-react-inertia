import React from 'react';
import route from 'ziggy-js';
import Layout from './user/layout';
import { InertiaLink } from '@inertiajs/inertia-react';

interface Props {
}

const Welcome:React.FC<Props> = props => {

    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <h1>Setup</h1>
                                    <ul>
                                        <li>
                                            composer install
                                        </li>
                                        <li>
                                            npm install && npm run dev (for css and js compile if needed)
                                        </li>
                                        <li>
                                            php artisan migrate
                                        </li>
                                        <li>
                                            php artisan run:setup (for seeding database with dummy jobs and default admin)
                                        </li>
                                        <li>
                                            if images are not visible after upload
                                            delete storage folder inside public and run php artisan storage:link
                                        </li>
                                        <li>
                                            <a href={route('admin.login')} target="_blank">
                                                Admin Portal
                                            </a>
                                        </li>
                                        <li>
                                            <InertiaLink href={route('login')}>
                                                User Portal
                                            </InertiaLink>
                                        </li>
                                    </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}
export default Welcome;