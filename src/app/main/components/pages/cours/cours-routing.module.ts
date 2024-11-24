import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoursComponent } from './cours.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CoursComponent }
	])],
	exports: [RouterModule]
})
export class CoursRoutingModule { }
