import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import SignupService from './service/signup.service';
import { MessageBoxService } from '@core/service/message-box.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
    signupForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private signupService: SignupService,
        private messageBox: MessageBoxService
    ) {}

    ngOnInit() {
        this.formReady();
    }

    formReady() {
        this.signupForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            username: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.signupForm.valid) {
            this.signupService.signup(this.signupForm.getRawValue()).subscribe({
                next: (err) => {
                    // this.messageBox.showSuccess('Pendaftaran berhasil silahkan melakukan verifikasi agar dapat mengakses sistem kami', 'Pendaftaran berhasil', true, 'verification');
                    this.messageBox.showSuccess(
                        'Pendaftaran berhasil silahkan melakukan verifikasi agar dapat mengakses sistem kami',
                        'Pendaftaran berhasil!',
                        false
                    );
                },
                error: (err) => {
                    const error = JSON.parse(err);
                    this.messageBox.showError(error.errors.reason[0]);
                },
            });
        } else {
            this.signupForm.markAllAsTouched();
        }
    }
}
