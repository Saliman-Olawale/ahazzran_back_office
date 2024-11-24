import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodedeverificationRoutingModule } from './codedeverification-routing.module';
import { CodedeverificationComponent } from './codedeverification.component'; 
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ServiceProxyModule } from 'src/app/shared/service-proxies/service-proxies.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        CodedeverificationRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        FormsModule,
        ServiceProxyModule
    ],
    declarations: [CodedeverificationComponent] 
})
export class CodedeverificationModule { }
