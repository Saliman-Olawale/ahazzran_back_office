import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NiveauComponent } from './niveau.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: NiveauComponent }
	])],
	exports: [RouterModule]
})
export class NiveauRoutingModule { }
