import { Component } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    sidebarVisible = true;
    screenWidth: number;

    constructor() {
        this.screenWidth = window.innerWidth;
        if (this.screenWidth < 992) {
            this.sidebarVisible = false;
        }
    }

    toggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible;
    }
}
