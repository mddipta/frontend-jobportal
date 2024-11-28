import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { ConfirmationService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { LocationAddComponent } from './location-add/location-add.component';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationRoutingModule } from './location-routing.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    declarations: [
        LocationAddComponent,
        LocationEditComponent,
        LocationListComponent,
    ],
    imports: [
        CommonModule,
        LocationRoutingModule,
        SharedComponentModule,
        CardModule,
        ConfirmDialogModule,
    ],
    providers: [ConfirmationService],
})
export class LocationModule {}
