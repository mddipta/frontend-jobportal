export interface JobTitleCreateRequest {
    title: string;
    jobSpecification: string[];
    jobDescription: string[];
}

export interface JobTitleUpdateRequest {
    id: string;
    title: string;
    isActive: true;
}

export interface JobDescriptionCreateRequest {
    jobTitle: {
        id: string;
    };
    description: string;
}

export interface JobSpecificationCreateRequest {
    jobTitle: {
        id: string;
    };
    specification: string;
}

export interface JobDescriptionUpdateRequest {
    id: string;
    description: string;
}

export interface JobSpecificationUpdateRequest {
    id: string;
    specification: string;
}
