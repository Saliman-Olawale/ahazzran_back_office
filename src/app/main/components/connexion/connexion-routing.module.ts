import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConnexionComponent } from './connexion.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ConnexionComponent }
    ])],
    exports: [RouterModule]
})
export class ConnexionRoutingModule { }
