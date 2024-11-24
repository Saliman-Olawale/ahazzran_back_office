import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['appLayout/dashboard'] }
                ]
            },
            {
                label: 'Contenus',
                routerLink: ['appLayout/contenus'],
                items: [
                    { 
                        label: 'Cours', 
                        icon: 'pi pi-fw pi-home',
                        items: [
                            {
                                label: 'Chapitres',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/appLayout/contenus/cours/chapitre']
                            },
                            {
                                label: 'Leçons',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/appLayout/contenus/cours/leçon']
                            },
                            {
                                label: 'Niveaux',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/appLayout/contenus/cours/niveau']
                            },
                            {
                                label: 'Abrobations',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/cours/abrobation']
                            },
                        ] 
                    },
                    { label: 'Langues', icon: 'pi pi-fw pi-home', routerLink: ['/appLayout/contenus/langue'] },
                    { label: 'Dictionnaire', icon: 'pi pi-fw pi-home', routerLink: ['/appLayout/contenus/dictionnaire'] }
                ]
            },
            {
                label: 'Sécurité',
                routerLink: ['appLayout/securite'],
                items: [
                    { label: 'Utilisateurs', icon: 'pi pi-fw pi-home', routerLink: ['/appLayout/securite/utilisateur'] },
                    { label: 'Rôles', icon: 'pi pi-fw pi-home', routerLink: ['/appLayout/securite/role'] },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/auth'],
                        items: [
        
                            {
                                label: 'Connexion',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/']
                            },
                            {
                                label: 'Code de verification',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/codedeverification']
                            },
                            {
                                label: 'Nouveau mot de passe',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/nouveaumotdepasse']
                            },
                            
                            // {
                            //     label: 'Error',
                            //     icon: 'pi pi-fw pi-times-circle',
                            //     routerLink: ['/auth/error']s
                            // },
                            // {
                            //     label: 'Access Denied',
                            //     icon: 'pi pi-fw pi-lock',
                            //     routerLink: ['/auth/access']
                            // }
                        ]
                    },
                ]
            },
        ]
    }
}
