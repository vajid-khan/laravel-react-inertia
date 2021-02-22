import route from 'ziggy-js';
import Layout from "./layout";
import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import { Inertia } from "@inertiajs/inertia";
import FileInput from "../../components/file";
import IndustrySelect from "../../components/industry/select";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { EducationType, ExperienceType, UserType } from "../../interface";

interface HomeProps{
    user:UserType;
    education?:EducationType;
    experience?:ExperienceType;
}

const Home:React.FC<HomeProps> = props => {

    const sharedProps:any = usePage().props;

    const [processing, setProcessing] = useState(false);

    const [profileData,setProfileData] = useForm({
        ...props.user,
        ...props.education,
        ...props.experience
    });

    const [files,setFiles] = useState<{profile:File|null,cv:File|null}>({
        profile:null,
        cv:null
    });

    const handleFileChange = (key:'profile'|'cv',file:FileList) => {
        const temp = {...files};
        if(file){
            temp[key] = file[0];
            setFiles(temp);
        }

    }

    const onSubmit= (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setProcessing(true);
        const form = new FormData();
        for(let key in profileData){
            //@ts-ignore
            form.append(key,profileData[key]);
        }
        for(let key in files){
            //@ts-ignore
            form.append(key, files[key]);
        }
        Inertia.post(route('profile.update'), form)
        .finally(()=>setProcessing(false));
    }

    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                My Profile
                                <InertiaLink className="btn btn-success float-right" href={route('job.search')}>
                                    Search
                                </InertiaLink>
                            </div>
                            <div className="card-body">
                                <form onSubmit={onSubmit}>
                                    <strong>
                                        Personal Info
                                    </strong>
                                    <div className="row">
                                        <div className={`col-md-${profileData.profile_pic ? 8:12}`}>
                                            <FileInput
                                                title={'Profile Picture'}
                                                onChange={file=>handleFileChange('profile',file)}
                                            />
                                        </div>
                                        {
                                            sharedProps.user.profile_pic && ( 
                                                <div className="col-md-4">
                                                    <img
                                                        src={`/storage/${sharedProps.user.profile_pic}`}
                                                        className="img img-responsive"
                                                        style={{height:'80px',width:'80px',borderRadius:'50%',marginTop:'20px'}}
                                                    />
                                                </div>
                                            )
                                        }

                                    </div>

                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" className="form-control" name="name" value={profileData.name} required onChange={e=>setProfileData('name', e.target.value)} />
                                    </div>

                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" className="form-control" value={profileData.email} readOnly required/>
                                    </div>

                                    <div className="form-group">
                                        <label>Mobile</label>
                                        <input type="text" className="form-control" name="mobile" value={profileData.mobile} required onChange={e=>setProfileData('mobile', e.target.value)} />
                                    </div>

                                    <strong>
                                        Professional Info
                                    </strong>
                                    <div className="form-group">
                                        <label>Job Title</label>
                                        <input type="text" className="form-control" name="title" value={profileData.title} required onChange={e=>setProfileData('title', e.target.value)} />
                                    </div>

                                    <div className="form-group">
                                        <label>Last Company Name</label>
                                        <input type="text" className="form-control" name="company_name" value={profileData.company_name} required onChange={e=>setProfileData('company_name', e.target.value)}/>
                                    </div>

                                    <div className="form-group">
                                        <label>Date Started</label>
                                        <input type="date" placeholder="dd/mm/yyyy" className="form-control" name="date_started" value={profileData.date_started} required onChange={e=>setProfileData('date_started', e.target.value)}/>
                                    </div>

                                    <div className="form-group">
                                        <label>Industry</label>
                                        <IndustrySelect
                                            required
                                            value={profileData.industry}
                                            onChange={text=>setProfileData('industry',text)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Skills</label>
                                        <input type="text" className="form-control" name="skills" value={profileData.skills} required onChange={e=>setProfileData('skills', e.target.value)}/>
                                    </div>

                                    <div className="form-group">
                                        {profileData.cv_url?
                                            <a target="_blank" href={`/storage/${profileData.cv_url}`} className="float-right">
                                                View CV
                                            </a>:null
                                        }
                                        <FileInput
                                            title={'CV'}
                                            maxSizeMB={2}
                                            onChange={file=>handleFileChange('cv',file)}
                                        />
                                    </div>

                                    <strong>
                                        Educational Info
                                    </strong>
                                    <div className="form-group">
                                        <label>Highest Qualification</label>
                                        <input type="text" className="form-control" name="highest_qualification" value={profileData.highest_qualification} required onChange={e=>setProfileData('highest_qualification', e.target.value)}/>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>School</label>
                                                <input type="text" className="form-control" name="school" value={profileData.school} required onChange={e=>setProfileData('school', e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Completion Date</label>
                                                <input type="date" placeholder="dd/mm/yyyy" className="form-control" name="date_completed" value={profileData.date_completed} required onChange={e=>setProfileData('date_completed', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    <button className="btn btn-primary btn-block">
                                        {
                                            processing ? 'Please wait ...' : 'Submit'
                                        }
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;