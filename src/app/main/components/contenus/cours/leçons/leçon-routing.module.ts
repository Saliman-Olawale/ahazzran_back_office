import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeçonComponent } from './leçon.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: LeçonComponent }
	])],
	exports: [RouterModule]
})
export class LeçonRoutingModule { }
