import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@NgModule({
    declarations: [DashboardComponent],
    imports: [CommonModule, DashboardRoutingModule, CardModule, TableModule],
})
export class DashboardModule {}
