import { Injectable } from '@angular/core';
import { ApiService } from '@core/service/api.service';

@Injectable({ providedIn: 'root' })
class LayoutService {
    constructor(private api: ApiService) {}

    getDataLogin() {
        return this.api.get('user-login', null, true);
    }
}

export default LayoutService;
