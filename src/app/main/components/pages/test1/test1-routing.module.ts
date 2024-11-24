import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Test1Component } from './test1.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: Test1Component },
		{ path: 'test2/:id', loadChildren: () => import('./test2/test2.module').then(m => m.Test2Module) }
	])],
	exports: [RouterModule]
})
export class Test1RoutingModule { }
