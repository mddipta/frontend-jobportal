import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMainComponent } from './layout/component/app.main.component';
import { PageForbiddenComponent } from './layout/page-forbidden/page-forbidden.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { RedirectComponent } from './layout/redirect/redirect.component';
import { AuthLayoutComponent } from '@layout/auth-layout/auth-layout.component';
import { VerificationComponent } from 'projects/verification/verification.component';
import { verificationGuard } from '@core/verification.guard';
import { SidebarComponent } from '@layout/admin-layout/sidebar/sidebar.component';

const web: string = localStorage.getItem('web') ?? 'admin';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'dashboard',
                    component: SidebarComponent,
                },
                {
                    path: 'login',
                    component: AuthLayoutComponent,
                    loadChildren: () =>
                        import('projects/login/login.module').then(
                            (m) => m.LoginModule
                        ),
                },
                {
                    path: 'signup',
                    component: AuthLayoutComponent,
                    loadChildren: () =>
                        import('projects/signup/signup.module').then(
                            (m) => m.SignupModule
                        ),
                },
                {
                    path: 'verification',
                    component: VerificationComponent,
                    loadChildren: () =>
                        import(
                            'projects/verification/verification.module'
                        ).then((m) => m.VerificationModule),
                    canActivate: [verificationGuard],
                },
                {
                    path: 'redirect',
                    component: RedirectComponent,
                },
                {
                    path: '404',
                    component: PageNotFoundComponent,
                },
                {
                    path: '403',
                    component: PageForbiddenComponent,
                },
                {
                    path: 'showcase',
                    component: AppMainComponent,
                    loadChildren: () =>
                        import('./showcase/showcase.module').then(
                            (m) => m.ShowcaseModule
                        ),
                    // canActivate: [AuthGuard],
                },
                { path: '**', redirectTo: '404' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                canceledNavigationResolution: 'computed',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
