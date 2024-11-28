import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import LocationService from '../service/location.service';
import { MessageBoxService } from '@core/service/message-box.service';

@Component({
    selector: 'app-location-add',
    templateUrl: './location-add.component.html',
    styleUrls: ['./location-add.component.scss'],
})
export class LocationAddComponent {
    locationForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private locationService: LocationService,
        private messageBox: MessageBoxService
    ) {}

    ngOnInit() {
        this.formReady();
    }

    formReady() {
        this.locationForm = this.fb.group({
            code: ['', Validators.required],
            name: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.locationForm.valid) {
            this.locationService
                .add(this.locationForm.getRawValue())
                .subscribe({
                    next: (res) => {
                        this.messageBox.showSuccess(
                            'Lokasi berhasil ditambahkan'
                        );
                    },
                    error: (err) => {
                        this.messageBox.showError('Terjadi Kesalahan');
                    },
                });
        } else {
            this.locationForm.markAllAsTouched();
        }
    }
}
