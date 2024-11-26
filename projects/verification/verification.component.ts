import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import VerificationService from './service/verification.service';
import { MessageBoxService } from '@core/service/message-box.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent {
    otpForm: FormGroup;
    email: string;
    visible: boolean = false;

    constructor(
        private fb: FormBuilder,
        private verificationService: VerificationService,
        private messageBox: MessageBoxService,
        private router: Router
    ) {
        this.email = localStorage.getItem('email');
    }

    ngOnInit() {
        this.formReady();
    }

    formReady() {
        this.otpForm = this.fb.group({
            code: ['', Validators.required],
            email: [this.email, Validators.required],
        });
    }

    onSubmit() {
        if (this.otpForm.valid) {
            this.verificationService
                .verification(this.otpForm.getRawValue())
                .subscribe({
                    next: () => {
                        this.visible = true;
                        localStorage.removeItem('email');
                    },
                    error: (err) => {
                        const error = JSON.parse(err);
                        this.messageBox.showInfo(error.errors.reason[0]);
                    },
                });
        } else {
            this.otpForm.markAllAsTouched();
        }
    }

    onResendEmail() {
        this.verificationService.resend(this.email).subscribe({
            next: () => {
                this.messageBox.showSuccess(
                    'Berhasil mengirim kode verifikasi',
                    null,
                    false
                );
            },
            error: (err) => {
                const error = JSON.parse(err);
                this.messageBox.showInfo(error.errors.reason[0]);
            },
        });
    }

    onDirectLogin() {
        this.visible = false;
        this.router.navigateByUrl('/login');
    }
}
