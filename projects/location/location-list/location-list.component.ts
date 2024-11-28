import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '@core/shared-component/table/table.component';
import { ConfirmationService } from 'primeng/api';
import LocationService from '../service/location.service';
import { MessageBoxService } from '@core/service/message-box.service';

@Component({
    selector: 'app-location-list',
    templateUrl: './location-list.component.html',
    styleUrls: ['./location-list.component.scss'],
})
export class LocationListComponent {
    @ViewChild('TableComponent') table: TableComponent;
    body: any;
    kebabOption = {
        isEdit: true,
        isDelete: true,
    };

    columMap = [
        {
            label: 'Code',
            key: 'code',
        },
        {
            label: 'Nama',
            key: 'name',
        },
    ];

    constructor(
        private router: Router,
        private confirmationService: ConfirmationService,
        private locationService: LocationService,
        private messageBox: MessageBoxService
    ) {}

    tableAction(e) {
        const data = e.data;
        const action = e.action;

        if (action == 'edit') {
            this.router.navigateByUrl(`/locations/edit/${data.id}`);
        }

        if (action == 'delete') {
            this.confirmDelete(data.id);
        }
    }

    onSearch(e) {
        this.body = e;
        this.table.onSearch(this.body);
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
        this.locationService.delete(id).subscribe({
            next: (res) => {
                this.messageBox.showSuccess(
                    'Lokasi berhasil dihapus',
                    null,
                    false
                );
                this.table.reload();
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
