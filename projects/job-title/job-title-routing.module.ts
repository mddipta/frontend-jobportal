import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobTitleListComponent } from './job-title-list/job-title-list.component';
import { JobTitleAddComponent } from './job-title-add/job-title-add.component';
import { JobTitleEditComponent } from './job-title-edit/job-title-edit.component';
import { JobTitleDetailComponent } from './job-title-detail/job-title-detail.component';

const routes: Routes = [
    {
        path: '',
        component: JobTitleListComponent,
    },
    {
        path: 'new',
        component: JobTitleAddComponent,
    },
    {
        path: 'edit/:id',
        component: JobTitleEditComponent,
    },
    {
        path: 'detail/:id',
        component: JobTitleDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class JobTitleRoutingModule {}
