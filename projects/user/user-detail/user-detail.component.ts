import { Component } from '@angular/core';
import UserService from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetailResponse } from '../service/user.model';
import { MessageBoxService } from '@core/service/message-box.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
    userSubscribe: any;
    userId: string;
    user: UserDetailResponse;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private messageBox: MessageBoxService
    ) {}

    ngOnInit() {
        this.userSubscribe = this.route.params.subscribe((params) => {
            this.userId = params['id'];
            this.getData();
        });
    }

    getData() {
        this.userService.detail(this.userId).subscribe({
            next: (res) => {
                const phone = res.data.phone.replace('0', '62');
                this.user = res.data;
                this.user.phone = phone;
            },
            error: (err) => {
                if (err.code == 400) {
                    this.messageBox.showError(
                        'Detail dari user ini tidak ditemukan'
                    );
                }
            },
        });
    }

    ngOnDestroy() {
        if (this.userSubscribe) {
            this.userSubscribe.unsubscribe();
        }
    }
}
