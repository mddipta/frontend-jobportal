import { Injectable } from '@angular/core';
import { ApiService } from '@core/service/api.service';
import {
    JobDescriptionUpdateRequest,
    JobSpecificationCreateRequest,
    JobSpecificationUpdateRequest,
} from './job-title.model';
import {
    JobDescriptionCreateRequest,
    JobTitleCreateRequest,
    JobTitleUpdateRequest,
} from './job-title.model';

@Injectable({ providedIn: 'root' })
class JobTitleService {
    constructor(private api: ApiService) {}

    insert(request: JobTitleCreateRequest) {
        return this.api.post('job-titles', request);
    }

    data(id: string) {
        return this.api.get(`job-titles/${id}`);
    }

    update(request: JobTitleUpdateRequest) {
        return this.api.put(`job-titles`, request);
    }

    delete(id: string) {
        return this.api.delete(`job-titles/${id}`);
    }

    getData(id: string) {
        return this.api.get(`job-titles/${id}`);
    }

    addDesc(request: JobDescriptionCreateRequest) {
        return this.api.post('job-descriptions', request);
    }

    addSpec(request: JobSpecificationCreateRequest) {
        return this.api.post('job-specifications', request);
    }

    editDesc(id: string) {
        return this.api.get(`job-descriptions/edit/${id}`);
    }

    editSpec(id: string) {
        return this.api.get(`job-specifications/edit/${id}`);
    }

    updateDesc(request: JobDescriptionUpdateRequest) {
        return this.api.put(`job-descriptions`, request);
    }

    updateSpec(request: JobSpecificationUpdateRequest) {
        return this.api.put(`job-specifications`, request);
    }

    deleteDesc(id: string) {
        return this.api.delete(`job-descriptions/${id}`);
    }

    deleteSpec(id: string) {
        return this.api.delete(`job-specifications/${id}`);
    }
}

export default JobTitleService;
