import dayjs from 'dayjs';
import React from 'react';
import route from 'ziggy-js';
import AdminLayout from '../layout';
import { Inertia } from '@inertiajs/inertia';
import useForm from '../../../hooks/useForm';
import { InertiaLink } from '@inertiajs/inertia-react';
import Pagination from '../../../components/pagination';
import IndustrySelect from '../../../components/industry/select';
import { ExperienceType, Pagination as PaginationType, UserType } from '../../../interface';

interface User extends UserType{
    experience:ExperienceType
}

interface FilterType{
    name:string;
    email:string;
    title:string;
    education:string,
    skills:string;
    industry:string;  
}

interface Props {
    filters?:FilterType;
    users:PaginationType<User>;
}

const Search:React.FC<Props> = ({users,filters}) => {

    const [filter,setFilter] = useForm({
        name:filters?.name,
        email: filters?.email,
        title: filters?.title,
        education: filters?.education,
        skills: filters?.skills,
        industry:filters?.industry,
    });

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        Inertia.get(route('admin.search.candidate'), filter);
    }

    return (
        <AdminLayout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                Search Candidates
                                <InertiaLink className="btn btn-success float-right" href={route('admin.home')}>
                                    Back
                                </InertiaLink>
                            </div>
                            <div className="card-body">
                                <form onSubmit={onSubmit}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Name" value={filter.name} onChange={e=>setFilter('name', e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <input type="email" className="form-control" placeholder="Email" value={filter.email} onChange={e=>setFilter('email', e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <input className="form-control" placeholder="Job Title" value={filter.title} onChange={e=>setFilter('title', e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <input className="form-control" placeholder="Education" value={filter.education}onChange={e=>setFilter('education', e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <input className="form-control" placeholder="Skills"  value={filter.skills} onChange={e=>setFilter('skills', e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <IndustrySelect
                                                value={filter.industry || ''}
                                                onChange={text=>setFilter('industry', text)}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <div className="float-right">
                                                <button className="btn btn-success">
                                                    Search
                                                </button>
                                                <InertiaLink className="btn btn-danger" href={route('admin.search.candidate')}>
                                                    RESET
                                                </InertiaLink>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <br/>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <td>
                                                Name
                                            </td>
                                            <td>
                                                Title
                                            </td>
                                            <td>
                                                Skills
                                            </td>
                                            <td>
                                                Joined on
                                            </td>
                                        </thead>
                                        <tbody>
                                            {
                                                users.data.length == 0 ?
                                                <tr className="text-center">
                                                    <td colSpan={4}>
                                                        No Candidate Found
                                                    </td>
                                                </tr>
                                                :
                                                users.data.map(user=>(
                                                    <tr key={user.mobile}>
                                                        <td>
                                                            {user.name} <br/>
                                                            {user.email}
                                                        </td>
                                                        <td>
                                                            {user.experience?.title || 'N/A'}
                                                        </td>                                  
                                                        <td>
                                                            {user.experience?.skills || 'N/A'}
                                                        </td>
                                                        <td>
                                                            {dayjs(user.created_at).format('DD MMM YYYY')}
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination
                                        paginator={users}
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
export default Search;