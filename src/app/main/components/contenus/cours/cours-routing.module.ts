import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: 'chapitre', loadChildren: () => import('./chapitres/chapitre.module').then(m => m.ChapitreModule) },
		{ path: 'niveau', loadChildren: () => import('./niveaux/niveau.module').then(m => m.NiveauModule) },
	])],
	exports: [RouterModule]
})
export class CoursRoutingModule { }