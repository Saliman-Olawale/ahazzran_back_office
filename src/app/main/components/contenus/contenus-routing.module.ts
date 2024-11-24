import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'cours', loadChildren: () => import('./cours/cours.module').then(m => m.CoursModule) },
        { path: 'langue', loadChildren: () => import('./langues/langue.module').then(m => m.LangueModule) },
        { path: 'dictionnaire', loadChildren: () => import('./dictionnaire/dictionnaire.module').then(m => m.DictionnaireModule) },
    ])],
    exports: [RouterModule]
})
export class ContenusRoutingModule { }
