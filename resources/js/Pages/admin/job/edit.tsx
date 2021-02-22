import React from 'react';
import route from 'ziggy-js';
import AdminLayout from '../layout';
import useForm from '../../../hooks/useForm';
import { Inertia } from '@inertiajs/inertia';
import { JobType } from '../../../interface';
import { InertiaLink } from '@inertiajs/inertia-react';

interface Props {
    job:JobType
}

const EditJob:React.FC<Props> = ({job}) => {

    const [jobDetail, setJobDetail]= useForm(job);

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        Inertia.post(route('admin.job.update',{id:jobDetail.id}),{
            ...jobDetail,
            _method:'put'
        });
    }

    return (
        <AdminLayout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                Edit Job
                            </div>
                            <div className="card-body">
                                <form onSubmit={onSubmit}>
                                    <div className="form-group">
                                        <label>Company Name</label>
                                        <input type="text" className="form-control" value={jobDetail.company_name} onChange={e=>setJobDetail('company_name', e.target.value)} required/>
                                    </div>

                                    <div className="form-group">
                                        <label>Title</label>
                                        <input type="text" className="form-control" value={jobDetail.title} required onChange={e=>setJobDetail('title', e.target.value)}/>
                                    </div>

                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea className="form-control" required onChange={e=>setJobDetail('description', e.target.value)}>{jobDetail.description}</textarea>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InertiaLink href={route('admin.home')} className="btn btn-danger btn-block">
                                                Back
                                            </InertiaLink>
                                        </div>
                                        <div className="col-md-6">
                                            <button className="btn btn-primary btn-block">
                                                Submit
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
export default EditJob;