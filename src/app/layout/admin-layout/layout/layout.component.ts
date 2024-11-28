import { Component } from '@angular/core';
import AuthService from '@core/service/auth.service';
import { UserLoginResponseDto } from '../service/user.model';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
    user: UserLoginResponseDto;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.getUserLogin();
    }

    getUserLogin() {
        this.user = this.authService.getLoginData();
    }
}
