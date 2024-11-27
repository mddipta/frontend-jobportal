import {
    Component,
    EventEmitter,
    Input,
    Output,
    SimpleChanges,
} from '@angular/core';
import AuthService from '@core/service/auth.service';
import { MenuItem } from 'primeng/api';
import { UserLoginResponseDto } from '../service/user.model';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    @Output() toggleSidebar = new EventEmitter<void>();
    @Input() user: UserLoginResponseDto;

    items: MenuItem[] = [];

    constructor(private authService: AuthService) {}

    ngOnInit() {
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
        this.items = [
            {
                label: this.user.username,
                styleClass: 'py-2',
            },
            {
                label: this.user.email,
                styleClass: 'py-2',
            },
            {
                label: this.user.role,
                styleClass: 'py-2',
            },
            {
                separator: true,
                styleClass: 'mb-2',
            },
            {
                label: 'Logout',
                styleClass: 'py-2',
                command: () => {
                    this.authService.logout();
                },
            },
        ];
    }

    onToggleSidebar() {
        this.toggleSidebar.emit();
    }
}
