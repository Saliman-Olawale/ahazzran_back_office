import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ActivatedRoute } from '@angular/router';
import { CoursServiceProxy, CreateOrUpdateNiveauInputDto, ICreateOrUpdateNiveauInputDto, INiveauOutputDto, NiveauServiceProxy } from 'src/app/shared/service-proxies/service-proxies';

@Component({
    templateUrl: './niveau.component.html',
    providers: [MessageService]
})
export class NiveauComponent implements OnInit {

    niveaux: INiveauOutputDto [] = []

    niveau: INiveauOutputDto = {
        niveauId: 0,
        nom: '',
        ordre: 0,
        pointMin: 0,
        pointMax: 0,
        active: false,
    }

    dataSend: ICreateOrUpdateNiveauInputDto = {
        niveauId: 0,
        nom: '',
        ordre: 0,
        pointMin: 0,
        pointMax: 0,
        active: false,
    }

    niveauDialog: boolean = false;

    // --------------------------------------------------------

    submitted: boolean = false;

    rowsPerPageOptions = [5, 10, 20];

    constructor( private messageService: MessageService, private route: ActivatedRoute, private niveauService: NiveauServiceProxy) { }

    ngOnInit() {
        this.getData()
    }

    getData() {
        this.niveauService.getall().subscribe(
            (data) => { this.niveaux = data;},
            (error) => console.error(error)
        );
    }

    setStatus(niveau: INiveauOutputDto){
        if (niveau.active){
            this.niveauService.disable(niveau.niveauId).subscribe(
                response => {this.getData()},
                error => {console.error(error);}
            );
        } else {
            this.niveauService.enable(niveau.niveauId).subscribe(
                response => {this.getData()},
                error => {console.error(error);}
            );
        }
    }

    saveNiveau() {
        this.submitted = true;

            if (this.niveau.niveauId) {
                this.dataSend = {
                    niveauId: this.niveau.niveauId,
                    nom: this.niveau.nom,
                    ordre: this.niveau.ordre,
                    pointMin: this.niveau.pointMin,
                    pointMax: this.niveau.pointMax,
                    active: this.niveau.active,
                }

                const ToSend = new CreateOrUpdateNiveauInputDto(this.dataSend)

                this.niveauService.createorupdate(ToSend).subscribe(
                    response => {this.getData()},
                    error => {console.error(error)}
                );

                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mot Modfié', life: 3000 });
            } else {
                this.dataSend = {
                    niveauId: 0,
                    nom: this.niveau.nom,
                    ordre: this.niveau.ordre,
                    pointMin: this.niveau.pointMin,
                    pointMax: this.niveau.pointMax,
                    active: this.niveau.active,
                }

                console.log(this.dataSend)
                const ToSend = new CreateOrUpdateNiveauInputDto(this.dataSend)

                this.niveauService.createorupdate(ToSend).subscribe(
                    response => {this.getData()},
                    error => {console.error(error)}
                );

                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mot crée', life: 3000 });
            }

            this.niveauDialog = false;
            this.niveau = {
                niveauId: 0,
                nom: '',
                ordre: 0,
                pointMin: 0,
                pointMax: 0,
                active: false,
            };
    }

    openNew() {
        this.submitted = false;
        this.niveauDialog = true;
    }

    editNiveau(niveau: INiveauOutputDto) {
        this.niveau = { ...niveau };
        this.niveauDialog = true;
    }

    hideDialog() {
        this.niveauDialog = false;
        this.submitted = false;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
