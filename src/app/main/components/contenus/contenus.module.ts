import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenusRoutingModule } from './contenus-routing.module';
import { ServiceProxyModule } from 'src/app/shared/service-proxies/service-proxies.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ContenusRoutingModule,
        ServiceProxyModule
    ]
})
export class ContenusModule { }
