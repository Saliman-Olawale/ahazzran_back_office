import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnexionRoutingModule } from './connexion-routing.module';
import { ConnexionComponent } from './connexion.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ServiceProxyModule } from 'src/app/shared/service-proxies/service-proxies.module';

@NgModule({
    imports: [
        CommonModule,
        ConnexionRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ServiceProxyModule

    ],
    declarations: [ConnexionComponent]
})
export class ConnexionModule { }
