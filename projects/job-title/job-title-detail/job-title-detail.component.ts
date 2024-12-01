import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageBoxService } from '@core/service/message-box.service';
import { TableComponent } from '@core/shared-component/table/table.component';
import { ConfirmationService } from 'primeng/api';
import JobTitleService from '../service/job-title.service';

@Component({
    selector: 'app-job-title-detail',
    templateUrl: './job-title-detail.component.html',
    styleUrls: ['./job-title-detail.component.scss'],
})
export class JobTitleDetailComponent {
    subscribeJobTitle: any;
    jobTitleId: string;
    jobTitle: string;
    visibleDesc: boolean = false;
    visibleDescEdit: boolean = false;
    visibleSpec: boolean = false;
    visibleEditSpec: boolean = false;
    descForm: FormGroup;
    specForm: FormGroup;
    editDescForm: FormGroup;
    editSpecForm: FormGroup;

    @ViewChild('TableDescComponent') tableDesc: TableComponent;
    @ViewChild('TableSpecComponent') tableSpec: TableComponent;
    body: any;
    kebabOptionDesc = {
        isEdit: true,
        isDelete: true,
    };

    kebabOptionSpec = {
        isEdit: true,
        isDelete: true,
    };

    columMapDesc = [
        {
            label: 'Deskripsi',
            key: 'description',
        },
    ];

    columMapSpec = [
        {
            label: 'Spesifikasi',
            key: 'specification',
        },
    ];

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private jobTitleService: JobTitleService,
        private messageBox: MessageBoxService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.subscribeJobTitle = this.route.params.subscribe((params) => {
            this.jobTitleId = params['id'];
            this.getData();
        });
        this.formReadyDesc();
        this.formReadySpec();
        this.formReadyEditDesc();
        this.formReadyEditSpec();
    }

    getData() {
        this.jobTitleService.getData(this.jobTitleId).subscribe({
            next: (res) => {
                this.jobTitle = res.data.title;
            },
            error(err) {
                console.log(err);
            },
        });
    }

    formReadyDesc() {
        this.descForm = this.fb.group({
            jobTitle: {
                id: this.jobTitleId,
            },
            description: ['', Validators.required],
        });
    }

    formReadyEditDesc() {
        this.editDescForm = this.fb.group({
            id: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

    formReadySpec() {
        this.specForm = this.fb.group({
            jobTitle: {
                id: this.jobTitleId,
            },
            specification: ['', Validators.required],
        });
    }

    formReadyEditSpec() {
        this.editSpecForm = this.fb.group({
            id: ['', Validators.required],
            specification: ['', Validators.required],
        });
    }

    onSearchDesc(e) {
        this.body = e;
        this.tableDesc.onSearch(this.body);
    }

    onSearchSpec(e) {
        this.body = e;
        this.tableSpec.onSearch(this.body);
    }

    onSubmitDesc() {
        if (this.descForm.valid) {
            this.jobTitleService
                .addDesc(this.descForm.getRawValue())
                .subscribe({
                    next: (res) => {
                        this.messageBox.showSuccess(
                            'Data berhasil ditambahkan',
                            null,
                            false
                        );
                        this.tableDesc.reload();
                        this.visibleDesc = false;
                        this.formReadyDesc();
                    },
                    error: (err) => {
                        this.messageBox.showError(err.errors.reason[0]);
                    },
                });
        } else {
            this.descForm.markAllAsTouched();
        }
    }

    onSubmitSpec() {
        if (this.specForm.valid) {
            this.jobTitleService
                .addSpec(this.specForm.getRawValue())
                .subscribe({
                    next: (res) => {
                        this.messageBox.showSuccess(
                            'Data berhasil ditambahkan',
                            null,
                            false
                        );
                        this.tableSpec.reload();
                        this.visibleSpec = false;
                        this.formReadySpec();
                    },
                    error: (err) => {
                        this.messageBox.showError(err.errors.reason[0]);
                    },
                });
        } else {
            this.specForm.markAllAsTouched();
        }
    }

    onSubmitEditDesc() {
        if (this.editDescForm.valid) {
            this.jobTitleService
                .updateDesc(this.editDescForm.getRawValue())
                .subscribe({
                    next: (res) => {
                        this.messageBox.showSuccess(
                            'Data berhasil diubah',
                            null,
                            false
                        );
                        this.tableDesc.reload();
                        this.visibleDescEdit = false;
                        this.formReadyEditDesc();
                    },
                    error: (err) => {
                        this.messageBox.showError(err.errors.reason[0]);
                    },
                });
        }
    }

    onSubmitEditSpec() {
        if (this.editSpecForm.valid) {
            this.jobTitleService
                .updateSpec(this.editSpecForm.getRawValue())
                .subscribe({
                    next: (res) => {
                        this.messageBox.showSuccess(
                            'Data berhasil diubah',
                            null,
                            false
                        );
                        this.tableSpec.reload();
                        this.visibleEditSpec = false;
                        this.formReadyEditSpec();
                    },
                    error: (err) => {
                        this.messageBox.showError(err.errors.reason[0]);
                    },
                });
        } else {
            this.editSpecForm.markAllAsTouched();
        }
    }

    tableActionDesc(e) {
        const data = e.data;
        const action = e.action;

        if (action == 'edit') {
            this.editDescModal(data.id);
        }

        if (action == 'delete') {
            this.confirmDelete(data.id, 'desc');
        }
    }

    tableActionSpec(e) {
        const data = e.data;
        const action = e.action;

        if (action == 'edit') {
            this.editSpecModal(data.id);
        }

        if (action == 'delete') {
            this.confirmDelete(data.id, 'spec');
        }
    }

    confirmDelete(id: string, type: string) {
        this.confirmationService.confirm({
            message: 'Apakah anda yakin ingin menghapus data?',
            header: 'Konfirmasi Hapus',
            acceptLabel: 'Ya!',
            rejectLabel: 'Tidak',
            acceptIcon: 'fa fa-check mr-2',
            acceptButtonStyleClass:
                'bg-white text-red-500 hover:bg-red-500 hover:text-white border-red-500',
            rejectButtonStyleClass: 'bg-gray-600 text-white border-gray-600',
            blockScroll: true,
            accept: () => {
                if (type == 'desc') {
                    this.deleteDesc(id);
                } else {
                    this.deleteSpec(id);
                }
            },
        });
    }

    deleteDesc(id: string) {
        this.jobTitleService.deleteDesc(id).subscribe({
            next: (res) => {
                this.messageBox.showSuccess(
                    'Data berhasil dihapus',
                    null,
                    false
                );
                this.tableDesc.reload();
            },
            error: (err) => {
                this.messageBox.showError(err.errors.reason[0]);
            },
        });
    }

    deleteSpec(id: string) {
        this.jobTitleService.deleteSpec(id).subscribe({
            next: (res) => {
                this.messageBox.showSuccess(
                    'Data berhasil dihapus',
                    null,
                    false
                );
                this.tableSpec.reload();
            },
            error: (err) => {
                this.messageBox.showError(err.errors.reason[0]);
            },
        });
    }

    addDescModal() {
        this.visibleDesc = true;
    }

    addSpecModal() {
        this.visibleSpec = true;
    }

    editDescModal(id: string) {
        this.visibleDescEdit = true;
        this.jobTitleService.editDesc(id).subscribe({
            next: (res) => {
                this.editDescForm.patchValue(res.data);
            },
            error: (err) => {
                this.messageBox.showError(err.errors.reason[0]);
            },
        });
    }

    editSpecModal(id: string) {
        this.visibleEditSpec = true;
        this.jobTitleService.editSpec(id).subscribe({
            next: (res) => {
                this.editSpecForm.patchValue(res.data);
            },
            error: (err) => {
                this.messageBox.showError(err.errors.reason[0]);
            },
        });
    }

    ngOnDestroy() {
        if (this.subscribeJobTitle) {
            this.subscribeJobTitle.unsubscribe();
        }
    }
}
