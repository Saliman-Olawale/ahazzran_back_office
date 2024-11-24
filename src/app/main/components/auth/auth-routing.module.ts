import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        { path: 'codedeverification', loadChildren: () => import('./codedeverification/codedeverification.module').then(m => m.CodedeverificationModule) },
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
