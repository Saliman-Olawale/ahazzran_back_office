import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChapitreComponent } from './chapitre.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ChapitreComponent }
	])],
	exports: [RouterModule]
})
export class ChapitreRoutingModule { }
