export interface JobType {
    id: number;
    title: string;
    company_name: string;
    created_at?: string;
    description: string;
}

export interface AppliedJobType {
    job_id: number;
    applied_at: string;
}
