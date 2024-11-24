import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LangueComponent } from './langue.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: LangueComponent }
	])],
	exports: [RouterModule]
})
export class LangueRoutingModule { }
