import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageBoxService } from '@core/service/message-box.service';
import { TableComponent } from '@core/shared-component/table/table.component';
import { ConfirmationService } from 'primeng/api';
import UserService from '../service/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
    @ViewChild('TableComponent') table: TableComponent;
    body: any;
    kebabOption = {
        isEdit: true,
        isDelete: true,
        isDetail: true,
    };

    columMap = [
        {
            label: 'Username',
            key: 'username',
        },
        {
            label: 'Email',
            key: 'email',
        },
        {
            label: 'Role',
            key: 'role',
        },
    ];

    constructor(
        private router: Router,
        private confirmationService: ConfirmationService,
        private userService: UserService,
        private messageBox: MessageBoxService
    ) {}

    tableAction(e) {
        const data = e.data;
        const action = e.action;

        if (action == 'edit') {
            this.router.navigateByUrl(`/users/edit/${data.id}`);
        }

        if (action == 'detail') {
            this.router.navigateByUrl(`/users/detail/${data.id}`);
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
        this.userService.delete(id).subscribe({
            next: (res) => {
                this.messageBox.showSuccess(
                    'Data berhasil dihapus',
                    null,
                    false
                );
                this.table.reload();
            },
            error: (err) => {
                this.messageBox.showError('Terjadi kesalahan');
            },
        });
    }
}
