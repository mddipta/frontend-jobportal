import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import AuthService from './service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const userRole: string | undefined = authService.getUserRole();

    const allowedRoles = route.data?.['roles'] as string[];

    if (!authService.getLoginData()) {
        authService.logout();
        return false;
    }

    if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
        authService.logout();
        return false;
    }

    return true;
};
