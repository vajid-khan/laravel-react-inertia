import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import React from 'react';
import route from 'ziggy-js';

interface Props {
}

const AdminLayout:React.FC<Props> = props => {

    const sharedProps:any = usePage().props

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>


                <title>{sharedProps.appName}</title>

                <script src="js/app.js" defer></script>

                <link rel="dns-prefetch" href="//fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet"/>

                <link href="/css/app.css" rel="stylesheet"/>
            </head>
            <body>
                <div id="app">
                    <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                        <div className="container">
                            <a className="navbar-brand" href="{{ url('/') }}">
                                {sharedProps.appName}
                            </a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            
                                <ul className="navbar-nav ml-auto">
                                    {
                                        sharedProps.user?.name && (
                                            <li className="nav-item dropdown">
                                                <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                                    {sharedProps.user.name}
                                                </a>

                                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                                    <InertiaLink className="dropdown-item" method={'post'} href={route('admin.logout')}>
                                                        Logout
                                                    </InertiaLink>
                                                </div>
                                            </li>
                                        )
                                    }                            
                                </ul>
                            </div>
                        </div>
                    </nav>
                
                    <main className="py-4">
                        <div className="container">
                            {
                                sharedProps.success?.message ? (
                                    <div className="alert alert-success">
                                        <strong>Success</strong> {sharedProps.success.message}
                                    </div>
                                ) : null
                            }
                            {
                                sharedProps.error?.message ? (
                                    <div className="alert alert-danger">
                                        <strong>Erro!</strong> {sharedProps.error.message}
                                    </div>
                                ) : null
                            }
                        </div>
                        {props.children}
                    </main>
                </div>
            </body>
        </html>
    )
}
export default AdminLayout;