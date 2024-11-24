import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DictionnaireLanguesComponent } from './dictionnaire-langues.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DictionnaireLanguesComponent }
	])],
	exports: [RouterModule]
})
export class DictionnaireLanguesRoutingModule { }
