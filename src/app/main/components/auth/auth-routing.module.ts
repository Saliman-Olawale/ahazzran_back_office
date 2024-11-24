import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
<<<<<<< HEAD
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'connexion', loadChildren: () => import('./connexion/connexion.module').then(m => m.ConnexionModule) },
        { path: 'codeDeVerification', loadChildren: () => import('./codedeverification/codedeverification.module').then(m => m.CodedeverificationModule) }
=======
        { path: 'codedeverification', loadChildren: () => import('./codedeverification/codedeverification.module').then(m => m.CodedeverificationModule) },
>>>>>>> origin/jessica
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
