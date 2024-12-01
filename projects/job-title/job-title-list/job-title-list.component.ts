import { Component, ViewChild } from '@angular/core';
import { TableComponent } from '@core/shared-component/table/table.component';
import JobTitleService from '../service/job-title.service';
import { Router } from '@angular/router';
import { MessageBoxService } from '@core/service/message-box.service';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-job-title-list',
    templateUrl: './job-title-list.component.html',
    styleUrls: ['./job-title-list.component.scss'],
})
export class JobTitleListComponent {
    @ViewChild('TableComponent') table: TableComponent;
    body: any;
    kebabOption = {
        isEdit: true,
        isDelete: true,
        isDetail: true,
    };

    columMap = [
        {
            label: 'Pekerjaan',
            key: 'title',
        },
    ];

    constructor(
        private router: Router,
        private confirmationService: ConfirmationService,
        private jobTitleService: JobTitleService,
        private messageBox: MessageBoxService
    ) {}

    onSearch(e) {
        this.body = e;
        this.table.onSearch(this.body);
    }

    tableAction(e) {
        const data = e.data;
        const action = e.action;

        if (action == 'edit') {
            this.router.navigateByUrl(`/job-titles/edit/${data.id}`);
        }

        if (action == 'detail') {
            this.router.navigateByUrl(`/job-titles/detail/${data.id}`);
        }

        if (action == 'delete') {
            this.confirmDelete(data.id);
        }
    }

    confirmDelete(id: string) {
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
                this.delete(id);
            },
        });
    }

    delete(id: string) {
        this.jobTitleService.delete(id).subscribe({
            next: (res) => {
                this.messageBox.showSuccess(
                    'Data berhasil dihapus',
                    null,
                    false
                );
                this.table.reload();
            },
            error: (err) => {
                this.messageBox.showError(err.error.message[0]);
            },
        });
    }
}
