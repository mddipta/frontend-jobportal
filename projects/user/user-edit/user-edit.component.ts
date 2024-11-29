import { Component } from '@angular/core';
import { UserDetailResponse } from '../service/user.model';
import { ActivatedRoute } from '@angular/router';
import { MessageBoxService } from '@core/service/message-box.service';
import UserService from '../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { id } from 'date-fns/locale';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent {
    userSubscribe: any;
    userId: string;
    userForm!: FormGroup;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private messageBox: MessageBoxService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.userSubscribe = this.route.params.subscribe((params) => {
            this.userId = params['id'];
            this.getData();
        });
        this.formReady();
    }

    formReady() {
        this.userForm = this.fb.group({
            id: ['', Validators.required],
            username: ['', Validators.required],
            password: [''],
            email: ['', [Validators.required, Validators.email]],
            role: ['', Validators.required],
            isActive: [true],
        });
    }

    getData() {
        this.userService.edit(this.userId).subscribe({
            next: (res) => {
                this.userForm.patchValue({
                    id: res.data.id,
                    username: res.data.username,
                    email: res.data.email,
                    role: res.data.roleId,
                    isActive: res.data.isActive,
                });
            },
            error: (err) => {
                this.messageBox.showError('Terjadi kesalahan');
            },
        });
    }

    onSelectRole(e) {
        this.userForm.patchValue({
            role: e.id,
        });
    }

    onSubmit() {
        if (this.userForm.valid) {
            this.userService.update(this.userForm.getRawValue()).subscribe({
                next: (res) => {
                    this.messageBox.showSuccess('Data berhasil diubah');
                },
                error: (err) => {
                    this.messageBox.showError('Terjadi kesalahan');
                },
            });
        } else {
            this.userForm.markAllAsTouched();
        }
    }

    ngOnDestroy() {
        if (this.userSubscribe) {
            this.userSubscribe.unsubscribe();
        }
    }
}
