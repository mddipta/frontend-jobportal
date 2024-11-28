import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationAddComponent } from './location-add/location-add.component';
import { LocationEditComponent } from './location-edit/location-edit.component';

const routes: Routes = [
    {
        path: '',
        component: LocationListComponent,
    },
    {
        path: 'new',
        component: LocationAddComponent,
    },
    {
        path: 'edit/:id',
        component: LocationEditComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LocationRoutingModule {}
