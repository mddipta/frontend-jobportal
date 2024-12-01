import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import JobTitleService from '../service/job-title.service';
import { MessageBoxService } from '@core/service/message-box.service';

@Component({
    selector: 'app-job-title-add',
    templateUrl: './job-title-add.component.html',
    styleUrls: ['./job-title-add.component.scss'],
})
export class JobTitleAddComponent {
    jobForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private jobTitleService: JobTitleService,
        private messageBox: MessageBoxService
    ) {}

    ngOnInit() {
        this.formReady();
    }

    formReady() {
        this.jobForm = this.fb.group({
            title: ['', Validators.required],
            jobSpecification: this.fb.array([]),
            jobDescription: this.fb.array([]),
        });
    }

    get jobSpecification(): FormArray {
        return this.jobForm.get('jobSpecification') as FormArray;
    }

    get jobDescription(): FormArray {
        return this.jobForm.get('jobDescription') as FormArray;
    }

    addSpecification() {
        this.jobSpecification.push(this.fb.control('', Validators.required));
    }

    addDescription() {
        this.jobDescription.push(this.fb.control('', Validators.required));
    }

    removeSpecification(index: number) {
        this.jobSpecification.removeAt(index);
    }

    removeDescription(index: number) {
        this.jobDescription.removeAt(index);
    }

    onSubmit() {
        if (this.jobForm.valid) {
            this.jobTitleService.insert(this.jobForm.getRawValue()).subscribe({
                next: (res) => {
                    this.messageBox.showSuccess('Data berhasil disimpan');
                },
                error: (err) => {
                    this.messageBox.showError(err);
                },
            });
        } else {
            this.jobForm.markAllAsTouched();
        }
    }
}
