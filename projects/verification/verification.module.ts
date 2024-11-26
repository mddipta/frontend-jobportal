import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { VerificationComponent } from './verification.component';
import { VerificationRoutingModule } from './verification-routing.module';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    declarations: [VerificationComponent],
    imports: [
        VerificationRoutingModule,
        ButtonModule,
        ReactiveFormsModule,
        CommonModule,
        SharedComponentModule,
        CardModule,
        DialogModule,
    ],
})
export class VerificationModule {}
