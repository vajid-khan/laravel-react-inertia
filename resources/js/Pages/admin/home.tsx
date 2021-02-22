import dayjs from 'dayjs';
import React from 'react';
import route from 'ziggy-js';
import AdminLayout from './layout';
import Pagination from '../../components/pagination';
import { InertiaLink } from '@inertiajs/inertia-react';
import { JobType, Pagination as PaginationType } from '../../interface';

interface Props {
    jobs:PaginationType<JobType>
}

const Home:React.FC<Props> = ({jobs}) => {

    return (
        <AdminLayout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                Job List
                                <InertiaLink className="btn btn-info float-right" href={route('admin.job.create')}>
                                    Add Job
                                </InertiaLink>

                                <InertiaLink className="btn btn-success float-right" href={route('admin.search.candidate')}>
                                    Search Candidate
                                </InertiaLink>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <td>
                                                    Title
                                                </td>
                                                <td>
                                                    Company
                                                </td>
                                                <td>
                                                    Posted on
                                                </td>
                                                <td>
                                                    Action
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                jobs.data.length === 0 ?
                                                <tr className="text-center">
                                                    <td colSpan={3}>
                                                        Start Creating Job
                                                    </td>
                                                </tr>
                                                :
                                                jobs.data.map(job => (
                                                    <tr key={job.id}>
                                                        <td>
                                                            {job.title}
                                                        </td>
                                                        <td>
                                                            {job.company_name}
                                                        </td>
                                                        <td>
                                                            {dayjs(job.created_at).format('DD MMM YYYY')}
                                                        </td>
                                                        <td>
                                                            <InertiaLink className="btn btn-info" href={route('admin.job.edit', {id:job.id})}>
                                                                Edit
                                                            </InertiaLink>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination
                                        paginator={jobs}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
export default Home;