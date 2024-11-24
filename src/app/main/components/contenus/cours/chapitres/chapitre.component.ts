import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/main/service/product.service';
import { CreateOrUpdateChapitreInputDto, ICreateOrUpdateChapitreInputDto, IChapitreOutputDto, ChapitreOutputDto, ChapitresServiceProxy } from 'src/app/shared/service-proxies/service-proxies';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './chapitre.component.html',
    providers: [MessageService]
})
export class ChapitreComponent implements OnInit {

    chapitreDialog: boolean = false;

    chapitres: ChapitreOutputDto[] = [];

    chapitre: IChapitreOutputDto = {
        chapitreId: 0,
        nomChapitre: '',
        codeChapitre: '',
        active: false
    };

    submitted: boolean = false;

    status: boolean = true;

    rowsPerPageOptions = [5, 10, 20];

    dataSend: ICreateOrUpdateChapitreInputDto = {
        chapitreId: 0,
        nomChapitre: '',
        codeChapitre: ''
    };

    constructor(private chapitresService: ChapitresServiceProxy, private messageService: MessageService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.getAlll()
    }

    getAlll() {
        this.chapitresService.getall().subscribe((data) => {
            this.chapitres = data;
        })
    }

    goToChapitre(chapitreId: number){
        this.router.navigate(['chapLecon', chapitreId], { relativeTo: this.route });
    }

    openNew() {
        this.chapitre = {
            chapitreId: 0,
            nomChapitre: '',
            codeChapitre: '',
            active: false
        };
        this.submitted = false;
        this.chapitreDialog = true;
    }

    editChapitre(chapitre: IChapitreOutputDto) {
        this.chapitre = { ...chapitre };
        this.chapitreDialog = true;
    }

    hideDialog() {
        this.chapitreDialog = false;
        this.submitted = false;
    }

    saveChapitre() {
        this.submitted = true;

        if (this.chapitre.nomChapitre?.trim()){
            if (this.chapitre.chapitreId) {

                this.dataSend = {
                    chapitreId: this.chapitre.chapitreId,
                    nomChapitre: this.chapitre.nomChapitre,
                    codeChapitre: this.chapitre.codeChapitre
                }

                const ToSend = new CreateOrUpdateChapitreInputDto(this.dataSend)

                this.chapitresService.createorupdate(ToSend).subscribe(
                    response => {this.getAlll()},
                    error => {console.error(error)}
                );

                this.messageService.add({ severity: 'success', summary: 'Successful', detail: ' Chapitre créée', life: 3000 });
            } else {
                console.log("Mercy")
                this.dataSend = {
                    chapitreId: 0,
                    nomChapitre: this.chapitre.nomChapitre,
                    codeChapitre: this.createId()
                }
                console.log(this.dataSend);
                const ToSend = new CreateOrUpdateChapitreInputDto(this.dataSend)

                this.chapitresService.createorupdate(ToSend).subscribe(
                    response => {this.getAlll()},
                    error => {console.error(error);}
                );

                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }
        }

            this.chapitreDialog = false;
            this.chapitre = {
                chapitreId: 0,
                nomChapitre: '',
                codeChapitre: '',
                active: false
            };
    }

    setStatus(chapitre: IChapitreOutputDto){
        if (chapitre.active){
            this.chapitresService.disable(chapitre.chapitreId).subscribe(
                response => {this.getAlll()},
                error => {console.error(error);}
            );
        } else {
            this.chapitresService.enable(chapitre.chapitreId).subscribe(
                response => {this.getAlll()},
                error => {console.error(error);}
            );
        }
    }

    createId(): string {
        let id = '';
        const chars = '1234567890';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    createCode(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVW';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

}