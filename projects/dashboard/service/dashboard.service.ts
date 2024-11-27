import { Injectable } from '@angular/core';
import { ApiService } from '@core/service/api.service';

@Injectable({ providedIn: 'root' })
class DashboardService {
    constructor(private api: ApiService) {}

    getDataLogin() {
        return this.api.get('user-login', null, true);
    }

    getDataDashboard() {
        return this.api.get('dashboard', null, true);
    }
}

export default DashboardService;
