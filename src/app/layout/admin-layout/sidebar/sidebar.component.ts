import { Component, Input, SimpleChanges } from '@angular/core';
import { UserLoginResponseDto } from '../service/user.model';
import { MENU } from '@core/config/app.config';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    @Input() user: UserLoginResponseDto;

    sidebarVisible = true;
    screenWidth: number;
    menuSidebar: any[] = MENU;
    subscribe: any;

    constructor(private route: ActivatedRoute) {
        this.screenWidth = window.innerWidth;
        if (this.screenWidth < 992) {
            this.sidebarVisible = false;
        }
    }

    ngOnInit() {
        //Get current route
        if (this.user) {
            this.listMenu();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['user'] && changes['user'].currentValue) {
            this.listMenu();
        }
    }

    listMenu() {
        this.menuSidebar = this.menuSidebar.filter((item) => {
            return item.role.includes(this.user.roleCode);
        });

        this.subscribe = this.route.url.subscribe((url) => {
            const currentPath = '/' + url[0].path;
            this.menuSidebar = this.menuSidebar.map((item) => {
                if (item.route === currentPath) {
                    item.active = true;
                } else {
                    item.active = false;
                }
                return item;
            });
        });

        console.log(this.menuSidebar);
    }

    toggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible;
    }
}
