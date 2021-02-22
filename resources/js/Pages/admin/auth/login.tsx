import React from 'react';
import route from 'ziggy-js';
import AdminLayout from '../layout';
import { Inertia } from '@inertiajs/inertia';
import useForm from '../../../hooks/useForm';

interface Props {
}

const Login:React.FC<Props> = props => {

    const [credential, setCredential] = useForm({
        email: process.env.NODE_ENV === 'development' ? 'admin@admin.com' : '',
        password: process.env.NODE_ENV === 'development' ? 'secret' :'',
    });

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Inertia.post(route('admin.login'),credential);
    }

    return (
        <AdminLayout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Admin Login</div>

                            <div className="card-body">
                                <form onSubmit={onSubmit}>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                        <div className="col-md-6">
                                            <input id="email" type="email" className="form-control" required autoComplete="email" autoFocus value={credential.email} onChange={e=>setCredential('email', e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                        <div className="col-md-6">
                                            <input id="password" type="password" className="form-control" required autoComplete="current-password" value={credential.password} onChange={e=>setCredential('password', e.target.value)}  />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
export default Login;