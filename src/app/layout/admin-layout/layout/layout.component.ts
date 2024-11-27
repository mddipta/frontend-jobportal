import { Component } from '@angular/core';
import LayoutService from '../service/layout.service';
import AuthService from '@core/service/auth.service';
import { UserLoginResponseDto } from '../service/user.model';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
    user: UserLoginResponseDto;

    constructor(
        private layoutService: LayoutService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.getUserLogin();
    }

    getUserLogin() {
        this.layoutService.getDataLogin().subscribe({
            next: (res) => {
                this.user = res.data;
            },
            error: (err) => {
                this.authService.logout();
            },
        });
    }
}
