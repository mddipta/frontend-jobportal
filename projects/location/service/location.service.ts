import { Injectable } from '@angular/core';
import { LocationCreateRequest, LocationUpdateRequest } from './location.model';
import { ApiService } from '@core/service/api.service';

@Injectable({ providedIn: 'root' })
class LocationService {
    constructor(private api: ApiService) {}

    add(request: LocationCreateRequest) {
        return this.api.post('locations', request);
    }

    getOne(id: string) {
        return this.api.get(`locations/${id}`);
    }

    update(request: LocationUpdateRequest) {
        return this.api.put('locations', request);
    }

    delete(id: string) {
        return this.api.delete(`locations/${id}`);
    }
}

export default LocationService;
