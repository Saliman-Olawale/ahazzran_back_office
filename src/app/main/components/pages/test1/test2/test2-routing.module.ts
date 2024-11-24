import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Test2Component } from './test2.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: Test2Component }
	])],
	exports: [RouterModule]
})
export class Test2RoutingModule { }
