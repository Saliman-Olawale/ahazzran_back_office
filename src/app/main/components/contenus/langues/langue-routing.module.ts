import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LangueComponent } from './langue.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: LangueComponent },
		{ path: 'dictionnaireLangues/:id', loadChildren: () => import('./dictionnaire-langues/dictionnaire-langues.module').then(m => m.DictionnaireLanguesModule)},
	])],
	exports: [RouterModule]
})
export class LangueRoutingModule { }
