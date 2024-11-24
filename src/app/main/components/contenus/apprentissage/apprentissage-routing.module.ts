import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApprentissageComponent } from './apprentissage.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ApprentissageComponent }
	])],
	exports: [RouterModule]
})
export class ApprentissageRoutingModule { }
