import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AuthService from '@core/service/auth.service';
import { MessageBoxService } from '@core/service/message-box.service';
import LoginService from './service/login.service';
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
        private fb: FormBuilder,
        private router: Router
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
                    if (obj.data.role === 'SA') {
                        this.router.navigateByUrl('/dashboard');
                    }
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
