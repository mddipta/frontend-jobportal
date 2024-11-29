export interface UserDetailResponse {
    id: string;
    username: string;
    email: string;
    roleCode: string;
    role: string;
    profilePic: string;
    name: string;
    phone: string;
    address: string;
    city: string;
    gender: string;
    born: string;
    isActive: boolean;
}

export interface CreateUserRequest {
    username: string;
    password: string;
    email: string;
    role: string;
}

export interface UpdateUserRequest {
    id: string;
    username: string;
    email: string;
    role: string;
    isActive: boolean;
}
