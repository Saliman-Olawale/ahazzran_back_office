import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChapitreComponent } from './chapitre.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ChapitreComponent },
		{ path: 'chapLecon/:id', loadChildren: () => import('./leçons/leçon.module').then(m => m.LeçonModule) },
	])],
	exports: [RouterModule]
})
export class ChapitreRoutingModule { }
