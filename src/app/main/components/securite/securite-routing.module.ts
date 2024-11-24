import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'utilisateur', loadChildren: () => import('./utilisateurs/utilisateur.module').then(m => m.UtilisateurModule) },
        { path: 'role', loadChildren: () => import('./roles/role.module').then(m => m.RoleModule) },
        
    ])],
    exports: [RouterModule]
})
export class SecuriteRoutingModule { }
