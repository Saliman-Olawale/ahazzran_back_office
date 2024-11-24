import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuizComponent } from './quiz.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: QuizComponent }
	])],
	exports: [RouterModule]
})
export class QuizRoutingModule { }
