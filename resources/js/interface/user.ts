export interface UserType {
    cv_url: string;
    email: string;
    mobile: string;
    name: string;
    profile_pic: string;
    created_at?: string;
}
export interface EducationType {
    school: string;
    date_completed: string;
    highest_qualification: string;
}

export interface ExperienceType {
    title: string;
    skills: string;
    industry: string;
    date_started: string;
    company_name: string;
}
