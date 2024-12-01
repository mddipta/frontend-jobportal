import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobTitleRoutingModule } from './job-title-routing.module';
import { JobTitleListComponent } from './job-title-list/job-title-list.component';
import { JobTitleAddComponent } from './job-title-add/job-title-add.component';
import { JobTitleEditComponent } from './job-title-edit/job-title-edit.component';
import { JobTitleDetailComponent } from './job-title-detail/job-title-detail.component';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
    declarations: [
        JobTitleListComponent,
        JobTitleAddComponent,
        JobTitleEditComponent,
        JobTitleDetailComponent,
    ],
    imports: [
        CommonModule,
        JobTitleRoutingModule,
        SharedComponentModule,
        CardModule,
        ConfirmDialogModule,
    ],
    providers: [ConfirmationService],
})
export class JobTitleModule {}
