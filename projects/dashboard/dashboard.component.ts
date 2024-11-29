import { Component } from '@angular/core';
import DashboardService from './service/dashboard.service';
import { DashboardResponseDto } from './service/dashboard.model';
import AuthService from '@core/service/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
    currentDate: string;
    username: string;
    dataDashboard: DashboardResponseDto;

    constructor(
        private dashboardService: DashboardService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.currentDate = this.getFormattedDate();
        this.getDataLogin();
        this.getDataDashboard();
    }

    getFormattedDate(): string {
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Intl.DateTimeFormat('id-ID', options).format(date);
    }

    getDataLogin() {
        this.username = this.authService.getLoginData().username;
    }

    getDataDashboard() {
        this.dashboardService.getDataDashboard().subscribe({
            next: (res) => {
                this.dataDashboard = res.data;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
