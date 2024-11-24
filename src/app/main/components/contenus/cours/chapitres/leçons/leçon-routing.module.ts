import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeçonComponent } from './leçon.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: LeçonComponent },
		{ path: 'leconQuiz/:id', loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule)},
	])],
	exports: [RouterModule]
})
export class LeçonRoutingModule { }
