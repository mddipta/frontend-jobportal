import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';

@NgModule({
    declarations: [SignupComponent],
    imports: [
        SignupRoutingModule,
        ButtonModule,
        ReactiveFormsModule,
        CommonModule,
        SharedComponentModule,
    ],
})
export class SignupModule {}
