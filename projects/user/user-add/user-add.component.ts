import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageBoxService } from '@core/service/message-box.service';
import UserService from '../service/user.service';

@Component({
    selector: 'app-user-add',
    templateUrl: './user-add.component.html',
    styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent {
    userForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private messageBox: MessageBoxService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.formReady();
    }

    formReady() {
        this.userForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            role: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.userForm.valid) {
            this.userService.add(this.userForm.getRawValue()).subscribe({
                next: (res) => {
                    this.messageBox.showSuccess('User berhasil ditambahkan');
                },
                error: (err) => {
                    this.messageBox.showError(err);
                },
            });
        } else {
            this.userForm.markAllAsTouched();
        }
    }

    onSelectRole(e) {
        this.userForm.patchValue({
            role: e.id,
        });
    }
}
