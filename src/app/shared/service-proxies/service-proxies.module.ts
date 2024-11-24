
import { NgModule } from '@angular/core';
import * as ApiServiceProxies from './service-proxies';


@NgModule({
    providers: [
        ApiServiceProxies.BackofficeServiceProxy,
        ApiServiceProxies.UtilisateurServiceProxy,
        ApiServiceProxies.LanguesServiceProxy,
        ApiServiceProxies.RolesServiceProxy,
       
    ]
})
export class ServiceProxyModule {
}