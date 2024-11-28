export interface LocationCreateRequest {
    code: string;
    name: string;
}

export interface LocationResponseDto {
    id: string;
    code: string;
    name: string;
    isActive: boolean;
}

export interface LocationUpdateRequest {
    id: string;
    name: string;
    isActive: boolean;
}
