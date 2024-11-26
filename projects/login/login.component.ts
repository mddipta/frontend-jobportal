import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import LoginService from './service/login.service';
import AuthService from '@core/service/auth.service';
import { MessageBoxService } from '@core/service/message-box.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    loginForm: FormGroup;
    isLoading: boolean = false;

    constructor(
        private loginService: LoginService,
        private authService: AuthService,
        private messageBox: MessageBoxService,
        private router: Router,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.formReady();
    }

    formReady() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.loginService.login(this.loginForm.getRawValue()).subscribe({
                next: (res) => {
                    const obj = JSON.parse(res);
                    this.authService.saveLoginData(obj);
                    this.messageBox.showSuccess(
                        'Login successful',
                        null,
                        false
                    );
                },
                error: (err) => {
                    const error = JSON.parse(err);
                    this.messageBox.showError(error.errors.reason[0]);
                },
            });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}
