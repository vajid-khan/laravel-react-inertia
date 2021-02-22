import dayjs from 'dayjs';
import route from 'ziggy-js';
import Layout from '../user/layout';
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Pagination from '../../components/pagination';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { AppliedJobType, JobType, Pagination as PaginationType } from '../../interface';

interface Props {
    jobs:PaginationType<JobType>,
    appliedJobs:AppliedJobType[];
}

const SearchJob:React.FC<Props> = ({jobs,appliedJobs}) => {

    const pageProps:any = usePage().props
    const [search,setSearchText] = useState(pageProps.search || '');

    const searchJob = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Inertia.get(route('job.search',{search}));
    }

    const applyJob = (job:JobType) => {
        Inertia.post(route('apply.job',{id:job.id}));
    }

    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                Search Job
                                <InertiaLink className="btn btn-success float-right" href={route('home')}>
                                    My Profile
                                </InertiaLink>
                            </div>
                            <div className="card-body">
                                <form method="get" onSubmit={searchJob}>
                                    
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <input type="text" placeholder="Search your dream job" className="form-control" name="search" value={search} onChange={e=>setSearchText(e.target.value)} required/>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <button className="btn btn-primary btn-block">
                                                Search
                                            </button>
                                        </div>
                                        <div className="col-md-2">
                                            <InertiaLink href={route('job.search')} className="btn btn-danger btn-block">
                                                Reset
                                            </InertiaLink>
                                        </div>
                                    </div>

                                </form>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
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
                                        </thead>
                                        <tbody>
                                            {jobs.data.length == 0?
                                                <tr className="text-center">
                                                    <td colSpan={4}>
                                                        No Job Found
                                                    </td>
                                                </tr>:null
                                            }
                                            {
                                                jobs.data.map(job => {
                                                    const isApplied = appliedJobs.find(item=>item.job_id === job.id)
                                                    return (
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
                                                                {
                                                                    isApplied ? (
                                                                        <span>
                                                                            Applied at <br/> {isApplied.applied_at}
                                                                        </span>
                                                                    ):
                                                                    <button className="btn btn-sm btn-info text-white" onClick={()=>applyJob(job)}>
                                                                        Apply
                                                                    </button>
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                
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
        </Layout>
    )
}
export default SearchJob