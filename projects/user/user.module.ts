import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
    declarations: [
        UserAddComponent,
        UserEditComponent,
        UserListComponent,
        UserDetailComponent,
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedComponentModule,
        CardModule,
        ConfirmDialogModule,
    ],
    providers: [ConfirmationService],
})
export class UserModule {}
