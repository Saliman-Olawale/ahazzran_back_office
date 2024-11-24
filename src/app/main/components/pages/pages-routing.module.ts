import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'cours', loadChildren: () => import('./cours/cours.module').then(m => m.CoursModule) },
        { path: 'langue', loadChildren: () => import('./langues/langue.module').then(m => m.LangueModule) },
        { path: 'utilisateur', loadChildren: () => import('./utilisateurs/utilisateur.module').then(m => m.UtilisateurModule) },
        { path: 'role', loadChildren: () => import('./roles/role.module').then(m => m.RoleModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: 'test1', loadChildren: () => import('./test1/test1.module').then(m => m.Test1Module) },
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
