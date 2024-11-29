import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
    {
        path: '',
        component: UserListComponent,
    },
    {
        path: 'new',
        component: UserAddComponent,
    },
    {
        path: 'edit/:id',
        component: UserEditComponent,
    },
    {
        path: 'detail/:id',
        component: UserDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
