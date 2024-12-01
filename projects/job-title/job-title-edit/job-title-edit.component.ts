import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import JobTitleService from '../service/job-title.service';
import { ActivatedRoute } from '@angular/router';
import { MessageBoxService } from '@core/service/message-box.service';

@Component({
    selector: 'app-job-title-edit',
    templateUrl: './job-title-edit.component.html',
    styleUrls: ['./job-title-edit.component.scss'],
})
export class JobTitleEditComponent {
    jobForm: FormGroup;
    jobTitleSubscribe: any;
    jobTitleId: string;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private jobTitleService: JobTitleService,
        private messageBox: MessageBoxService
    ) {}

    ngOnInit() {
        this.jobTitleSubscribe = this.route.params.subscribe((params) => {
            this.jobTitleId = params['id'];
            this.getData();
        });

        this.formReady();
    }

    formReady() {
        this.jobForm = this.fb.group({
            id: ['', Validators.required],
            title: ['', Validators.required],
            isActive: [true, Validators.required],
        });
    }

    getData() {
        this.jobTitleService.data(this.jobTitleId).subscribe({
            next: (res) => {
                this.jobForm.patchValue({
                    id: res.data.id,
                    title: res.data.title,
                    isActive: res.data.isActive,
                });
            },
            error: (err) => {
                console.error('Error:', err);
            },
        });
    }

    onSubmit() {
        if (this.jobForm.valid) {
            this.jobTitleService.update(this.jobForm.getRawValue()).subscribe({
                next: (res) => {
                    this.messageBox.showSuccess('Data berhasil diubah');
                },
                error: (err) => {
                    this.messageBox.showError('Terjadi kesalahan');
                },
            });
        } else {
            this.jobForm.markAllAsTouched();
        }
    }
}
