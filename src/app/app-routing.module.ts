import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './main/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { MydashboardComponent } from './main/components/mydashboard/mydashboard.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
<<<<<<< HEAD
            { path: '', loadChildren: () => import('./main/components/auth/connexion/connexion.module').then(m => m.ConnexionModule) },
            {
                path: 'appLayout', component: AppLayoutComponent,
                children: [
=======
            { path: '', loadChildren: () => import('./main/components/connexion/connexion.module').then(m => m.ConnexionModule)},
            {
                path: 'appLayout', component: AppLayoutComponent,
                children: [
                    // { path: '', loadChildren: () => import('./main/components/connexion/connexion.module').then(m => m.ConnexionModule) },
>>>>>>> origin/jessica
                    { path: 'dashboard', loadChildren: () => import('./main/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./main/components/uikit/uikit.module').then(m => m.UikitModule) },
                    { path: 'utilities', loadChildren: () => import('./main/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./main/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./main/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./main/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'contenus', loadChildren: () => import('./main/components/contenus/contenus.module').then(m => m.ContenusModule) },
                    { path: 'cours', loadChildren: () => import('./main/components/contenus/cours/cours.module').then(m => m.CoursModule) },
                    { path: 'securite', loadChildren: () => import('./main/components/securite/securite.module').then(m => m.SecuriteModule) },
                    // New Update Template
                    { path: 'mydashboard', component: MydashboardComponent },
                ],
            },
<<<<<<< HEAD
            { path: 'auth', loadChildren: () => import('./main/components/auth/auth.module').then(m => m.AuthModule) },
=======
            { path: 'auth', loadChildren: () => import('./main/components/auth/auth.module').then(m => m.AuthModule)},
>>>>>>> origin/jessica
            { path: 'landing', loadChildren: () => import('./main/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
<<<<<<< HEAD
export class AppRoutingModule {
}
=======
export class AppRoutingModule {}
>>>>>>> origin/jessica
