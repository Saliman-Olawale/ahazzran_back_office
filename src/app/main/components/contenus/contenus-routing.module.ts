import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'cours', loadChildren: () => import('./cours/cours.module').then(m => m.CoursModule) },
        { path: 'langue', loadChildren: () => import('./langues/langue.module').then(m => m.LangueModule) },
<<<<<<< HEAD
        { path: 'dictionnaireFrancais', loadChildren: () => import('./dictionnaire-francais/dictionnaire-francais.module').then(m => m.DictionnaireFrancaisModule) },
        { path: 'apprentissage', loadChildren: () => import('./apprentissage/apprentissage.module').then(m => m.ApprentissageModule) },
=======
        { path: 'dictionnaire', loadChildren: () => import('./dictionnaire/dictionnaire.module').then(m => m.DictionnaireModule) },
>>>>>>> origin/jessica
    ])],
    exports: [RouterModule]
})
export class ContenusRoutingModule { }
