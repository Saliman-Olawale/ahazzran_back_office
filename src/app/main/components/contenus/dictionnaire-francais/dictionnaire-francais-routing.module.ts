import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DictionnaireFrancaisComponent } from './dictionnaire-francais.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DictionnaireFrancaisComponent }
	])],
	exports: [RouterModule]
})
export class DictionnaireFrancaisRoutingModule { }
