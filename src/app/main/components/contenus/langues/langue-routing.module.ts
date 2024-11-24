import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LangueComponent } from './langue.component';

@NgModule({
	imports: [RouterModule.forChild([
<<<<<<< HEAD
		{ path: '', component: LangueComponent },
		{ path: 'dictionnaireLangues/:id', loadChildren: () => import('./dictionnaire-langues/dictionnaire-langues.module').then(m => m.DictionnaireLanguesModule)},
=======
		{ path: '', component: LangueComponent }
>>>>>>> origin/jessica
	])],
	exports: [RouterModule]
})
export class LangueRoutingModule { }
