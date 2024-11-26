import { Injectable } from '@angular/core';
import { VerificationUserRequestDto } from './verification.model';
import { ApiService } from '@core/service/api.service';

@Injectable({ providedIn: 'root' })
class VerificationService {
    constructor(private api: ApiService) {}

    verification(request: VerificationUserRequestDto) {
        return this.api.putNoHeader('users/verification', request, true);
    }

    resend(email: string) {
        return this.api.postNoHeader(
            'users/verification/resend',
            { email },
            true
        );
    }
}

export default VerificationService;
