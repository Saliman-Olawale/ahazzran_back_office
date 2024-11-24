import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CodedeverificationComponent} from './codedeverification.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CodedeverificationComponent }
    ])],
    exports: [RouterModule]
})
export class CodedeverificationRoutingModule { }
