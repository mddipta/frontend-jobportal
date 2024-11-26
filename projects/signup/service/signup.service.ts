import { Injectable } from '@angular/core';
import { ApiService } from '@core/service/api.service';
import { SignupRequestDto } from './signup.model';

@Injectable({ providedIn: 'root' })
class SignupService {
    constructor(private api: ApiService) {}

    signup(request: SignupRequestDto) {
        return this.api.postSignup('register', request, true);
    }
}

export default SignupService;
