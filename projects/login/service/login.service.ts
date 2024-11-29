import { Injectable } from '@angular/core';
import { ApiService } from '@core/service/api.service';
import { UserLoginRequestDto } from './login.model';

@Injectable({ providedIn: 'root' })
class LoginService {
    constructor(private api: ApiService) {}

    login(request: UserLoginRequestDto) {
        return this.api.postLogin('login', request, true);
    }
}

export default LoginService;
