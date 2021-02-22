import React from 'react';
import Layout from '../layout';
import useForm from '../../../hooks/useForm';
import { Inertia } from '@inertiajs/inertia';

interface Props {
}

const Login:React.FC<Props> = props => {

    const [values,setValues] = useForm({
        email: process.env.NODE_ENV === 'development' ? 'vajid@gmail.com' : '',
        password:process.env.NODE_ENV === 'development' ? 'vajid123' : ''
    });

    const onSubmit =(e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        Inertia.post('/login', values);
    }

    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Login</div>

                            <div className="card-body">
                                <form onSubmit={onSubmit}>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                        <div className="col-md-6">
                                            <input id="email" type="email" className="form-control" value={values.email} onChange={e=>setValues('email', e.target.value)} required autoComplete="email" autoFocus />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
                                        <div className="col-md-6">
                                            <input id="password" type="password" className="form-control" value={values.password} onChange={e=>setValues('password', e.target.value)} required autoComplete="current-password" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-6 offset-md-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" name="remember" id="remember" />
                                                <label className="form-check-label" htmlFor="remember">
                                                    Remember Me
                                                </label>
                                            </div>
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
        </Layout>
    )
}

export default Login;