import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DictionnaireComponent } from './dictionnaire.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DictionnaireComponent }
	])],
	exports: [RouterModule]
})
export class DictionnaireRoutingModule { }
