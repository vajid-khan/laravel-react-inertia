import React from 'react';
import route from 'ziggy-js';
import useForm from '../../../hooks/useForm';
import { Inertia } from '@inertiajs/inertia';

interface Props {
}

const Register:React.FC<Props> = props => {

    const testRandom = new Date().getTime()

    const [formData, setFormData] = useForm({
        name:  process.env.NODE_ENV === 'development' ? 'Vajid '+testRandom : '',
        email: process.env.NODE_ENV === 'development' ? `vajid.${testRandom}@gmail.com` : '',
        mobile:  process.env.NODE_ENV === 'development' ? testRandom.toString() : '',
        password: process.env.NODE_ENV === 'development' ? 'vajid123' : '',
    });

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Inertia.post(route('register'), formData)
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Register</div>

                        <div className="card-body">
                            <form onSubmit={onSubmit}>

                                <div className="form-group row">
                                    <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>
                                    <div className="col-md-6">
                                        <input id="name" type="text" className="form-control" value={formData.name} required autoComplete="name" autoFocus onChange={e=>setFormData('name', e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                    <div className="col-md-6">
                                        <input id="email" type="email" className="form-control" value={formData.email} required autoComplete="email" onChange={e=>setFormData('email', e.target.value)}/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="mobile" className="col-md-4 col-form-label text-md-right">Mobile</label>
                                    <div className="col-md-6">
                                        <input id="mobile" type="tel" className="form-control" value={formData.mobile} required onChange={e=>setFormData('mobile', e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
                                    <div className="col-md-6">
                                        <input id="password" type="password" className="form-control" value={formData.password} required autoComplete="new-password" onChange={e=>setFormData('password', e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-6 offset-md-4">
                                        <button type="submit" className="btn btn-primary">
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;