import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const verificationGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const email: string = localStorage.getItem('email');

    if (!email) {
        router.navigate(['/login']);
        return false;
    }

    return true;
};
