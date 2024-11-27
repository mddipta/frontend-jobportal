import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
class AuthService {
    constructor(private route: Router) {}

    saveLoginData(login: any): void {
        localStorage.setItem('dataLogin', JSON.stringify(login.data));
    }

    getLoginData(): any | undefined {
        const dataLogin = localStorage.getItem('dataLogin');
        if (dataLogin) {
            return JSON.parse(dataLogin);
        }
        return undefined;
    }

    getUserRole(): string | undefined {
        const dataLogin = this.getLoginData();
        if (dataLogin && dataLogin.role) {
            return dataLogin.role;
        }
        return undefined;
    }

    getToken(): string | undefined {
        const dataLogin = this.getLoginData();
        if (dataLogin && dataLogin.token) {
            return dataLogin.token;
        }
        return undefined;
    }

    logout(): void {
        localStorage.removeItem('dataLogin');
        this.route.navigateByUrl('/login');
    }
}

export default AuthService;
