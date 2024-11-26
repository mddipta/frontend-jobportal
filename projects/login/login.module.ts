import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        LoginRoutingModule,
        ButtonModule,
        ReactiveFormsModule,
        CommonModule,
        SharedComponentModule,
    ],
})
export class LoginModule {}
