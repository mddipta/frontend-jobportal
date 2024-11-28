import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import LocationService from '../service/location.service';
import { MessageBoxService } from '@core/service/message-box.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-location-edit',
    templateUrl: './location-edit.component.html',
    styleUrls: ['./location-edit.component.scss'],
})
export class LocationEditComponent {
    locationForm!: FormGroup;
    locationSubscription: any;
    locationId: string;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private locationService: LocationService,
        private messageBox: MessageBoxService
    ) {}

    ngOnInit() {
        this.locationSubscription = this.route.params.subscribe((params) => {
            this.locationId = params['id'];
            this.getData();
        });
        this.formReady();
    }

    formReady() {
        this.locationForm = this.fb.group({
            id: [''],
            code: [{ value: '', disabled: true }, Validators.required],
            name: ['', Validators.required],
            isActive: [true],
        });
    }

    getData() {
        this.locationService.getOne(this.locationId).subscribe({
            next: (res) => {
                this.locationForm.patchValue(res.data);
            },
            error: (err) => {
                this.messageBox.showError('Terjadi Kesalahan');
            },
        });
    }

    onSubmit() {
        if (this.locationForm.valid) {
            this.locationService
                .update(this.locationForm.getRawValue())
                .subscribe({
                    next: (res) => {
                        this.messageBox.showSuccess('Data berhasil diubah');
                    },
                    error: (err) => {
                        this.messageBox.showError('Terjadi Kesalahan');
                    },
                });
        } else {
            this.locationForm.markAllAsTouched();
        }
    }

    ngOnDestroy() {
        if (this.locationSubscription) {
            this.locationSubscription.unsubscribe();
        }
    }
}
