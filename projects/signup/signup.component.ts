import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import SignupService from './service/signup.service';
import { MessageBoxService } from '@core/service/message-box.service';
import { Router } from '@angular/router';

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
        private messageBox: MessageBoxService,
        private router: Router
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
        const password: string = this.signupForm.get('password').value;
        const confirmPassword: string =
            this.signupForm.get('confirmPassword').value;

        if (this.signupForm.valid) {
            if (password !== confirmPassword) {
                this.messageBox.showError(
                    'Password and Confirm Password must match'
                );
                return;
            }
            this.signupService.signup(this.signupForm.getRawValue()).subscribe({
                next: (err) => {
                    localStorage.setItem(
                        'email',
                        this.signupForm.get('email').value
                    );
                    this.router.navigateByUrl('/verification');
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
