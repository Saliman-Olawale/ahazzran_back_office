import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { BackofficeServiceProxy, ConnexionBackOfficeInputDto, ConnexionInputDto, IConnexionBackOfficeInputDto, IConnexionInputDto } from 'src/app/shared/service-proxies/service-proxies';
import { Router } from '@angular/router';

@Component({
    selector: 'app-',
    templateUrl: './connexion.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class ConnexionComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    email: string = '';

    submitted: boolean = false;

    input: IConnexionBackOfficeInputDto = {
        email: '',
        otp: ''
    }
    
    constructor( public backofficeService: BackofficeServiceProxy, public layoutService: LayoutService, private router: Router) { }

    continue(){
        this.submitted = true
        const dataToSend = new ConnexionBackOfficeInputDto(this.input)
        this.backofficeService.checkemail(dataToSend).subscribe(
            res => { 
                console.log("Connexion réussie") 
            },
            err => { console.log(err) }
        )

        localStorage.setItem('email', this.email);
        this.router.navigate(['/auth/codedeverification'])
    }
}
