import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { BackofficeServiceProxy, ConnexionBackOfficeInputDto, IConnexionBackOfficeInputDto } from 'src/app/shared/service-proxies/service-proxies';

@Component({
    selector: 'app-login',
    templateUrl: './codedeverification.component.html',
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
export class CodedeverificationComponent {

    // valCheck: string[] = ['remember'];
    // password!: string;

    message: string = ''; 

    email = localStorage.getItem('email') !== null ? localStorage.getItem('email') : '';

    loading: boolean = false;

    code: string = '';

    submitted: boolean = false;

    data: IConnexionBackOfficeInputDto = {
        email: '',
        otp: ''
    }


    constructor( public backofficeService: BackofficeServiceProxy, public layoutService: LayoutService, private router: Router) { }

    login(){
        this.submitted = true

        this.data = {
            email: this.email !== null ? this.email : '',
            otp: this.code
        }

        const dataToSend = new ConnexionBackOfficeInputDto(this.data)

<<<<<<< HEAD
        this.backofficeService.connexion(dataToSend).subscribe(
            res => {
=======
        this.backofficeService.connexion(dataToSend).subscribe( 
            res => {
                console.log(res)
                this.loading = false;

>>>>>>> origin/jessica
                if(res.status === 'Succes'){
                    console.log("oksqghcxfg") 
                    localStorage.setItem('token', res.token);
                    this.router.navigate(['appLayout/dashboard']);
                }
                else {
                    console.log(res.message)
                }
            },
            err => { console.log(err) }
        )
    }
<<<<<<< HEAD

=======
>>>>>>> origin/jessica
}

