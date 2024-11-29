import { Injectable } from '@angular/core';
import { ApiService } from '@core/service/api.service';
import { CreateUserRequest, UpdateUserRequest } from './user.model';

@Injectable({ providedIn: 'root' })
class UserService {
    constructor(private api: ApiService) {}

    add(request: CreateUserRequest) {
        return this.api.post('users', request);
    }

    delete(id: string) {
        return this.api.delete(`users/${id}`);
    }

    edit(id: string) {
        return this.api.get(`users/${id}`);
    }

    update(request: UpdateUserRequest) {
        return this.api.put(`users`, request);
    }

    detail(id: string) {
        return this.api.get(`user-profiles/${id}`);
    }
}

export default UserService;
