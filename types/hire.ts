export type HireRequestType = 'JOB' | 'PROJECT' | 'CONSULTATION' | 'OTHER';

export type RequestStatus = 
    | 'NEW' 
    | 'REVIEWING' 
    | 'CONTACTED' 
    | 'CALL_SCHEDULED' 
    | 'IN_PROGRESS' 
    | 'COMPLETED' 
    | 'CLOSED';

export type ComplexityCategory = 'STARTER' | 'STANDARD' | 'ADVANCED' | 'CUSTOM';

export interface ProjectSelection {
    projectType: string;
    features: string[];
    name: string;
    description: string;
    targetUsers?: string;
    referenceUrl?: string;
    additionalRequirements?: string;
    timeline: string;
    budget: string;
}

export interface JobSelection {
    recruiterName: string;
    company: string;
    roleTitle: string;
    jobDescriptionUrl?: string;
    location: string;
    employmentType: string;
    additionalInfo?: string;
    email: string;
    linkedinUrl?: string;
}

export interface ConsultationSelection {
    name: string;
    email: string;
    company?: string;
    topic: string;
    notes?: string;
    preferredTime?: string;
}

export interface HireSubmissionPayload {
    type: HireRequestType;
    name: string;
    email: string;
    company?: string;
    phone?: string;
    
    // Job fields
    roleTitle?: string;
    jobDescriptionUrl?: string;
    location?: string;
    employmentType?: string;
    linkedinUrl?: string;
    
    // Project fields
    projectType?: string;
    description?: string;
    features?: string[];
    timeline?: string;
    budget?: string;
    targetUsers?: string;
    referenceUrl?: string;
    additionalRequirements?: string;
    
    // Calculated estimate fields
    complexityScore?: number;
    complexityCategory?: ComplexityCategory;
    estimatedRange?: string;
    
    // Verification
    turnstileToken?: string;
}

export interface HireRequestRecord extends HireSubmissionPayload {
    id: string;
    requestId: string;
    status: RequestStatus;
    createdAt: string;
    updatedAt: string;
}
