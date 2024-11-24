
import { NgModule } from '@angular/core';
import * as ApiServiceProxies from './service-proxies';


@NgModule({
    providers: [
        ApiServiceProxies.BackofficeServiceProxy,
        ApiServiceProxies.UtilisateurServiceProxy,
        ApiServiceProxies.LanguesServiceProxy,
<<<<<<< HEAD
        ApiServiceProxies.ChapitresServiceProxy,
        ApiServiceProxies.DictionnaireServiceProxy,
        ApiServiceProxies.ContenulangueServiceProxy,
        ApiServiceProxies.CoursServiceProxy,
        ApiServiceProxies.NiveauServiceProxy
=======
        ApiServiceProxies.RolesServiceProxy,
       
>>>>>>> origin/jessica
    ]
})
export class ServiceProxyModule {
}