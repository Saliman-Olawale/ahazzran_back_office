
import { NgModule } from '@angular/core';
import * as ApiServiceProxies from './service-proxies';


@NgModule({
    providers: [
        ApiServiceProxies.BackofficeServiceProxy,
        ApiServiceProxies.UtilisateurServiceProxy,
        ApiServiceProxies.LanguesServiceProxy,
        ApiServiceProxies.ChapitresServiceProxy,
        ApiServiceProxies.DictionnaireServiceProxy,
        ApiServiceProxies.ContenulangueServiceProxy,
        ApiServiceProxies.CoursServiceProxy,
        ApiServiceProxies.NiveauServiceProxy
    ]
})
export class ServiceProxyModule {
}