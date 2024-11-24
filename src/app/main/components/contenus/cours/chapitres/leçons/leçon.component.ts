import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/main/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/main/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapitreOutputDto, CoursServiceProxy, CreateOrUpdateCoursInputDto, IChapitreOutputDto, ICoursOutputDto, ICreateOrUpdateCoursInputDto } from 'src/app/shared/service-proxies/service-proxies';

@Component({
    templateUrl: './leçon.component.html',
    providers: [MessageService]
})
export class LeçonComponent implements OnInit {

    chapitreId!: number;

    currentChapitre: IChapitreOutputDto = {
        chapitreId: 0,
        nomChapitre: '',
        codeChapitre: '',
        active: false,
    }

    currentLecons: ICoursOutputDto [] = []

    lecon: ICoursOutputDto = {
        id: 0,
        codeCours: '',
        nomCours: '',
        active: false,
    }

    dataSend: ICreateOrUpdateCoursInputDto = {
        id: 0,
        codeCours: '',
        nomCours: '',
        chapitreId: 0,
        active: false,
    }

    leconDialog: boolean = false;

    // --------------------------------------------------------

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor( private messageService: MessageService, private leconService: CoursServiceProxy, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.chapitreId = +params['id'];
        });
        this.getData()
    }

    getData() {
        this.leconService.getone(this.chapitreId).subscribe(
            (data) => {
                this.currentChapitre = data.chapitre;
                this.currentLecons = data.cours;
            }, (error) => console.error(error)
        );

        // this.dictionnaireService.getall().subscribe(
        //     (data) => {
        //         this.dico = data;
        //     }, (error) => console.error(error)
        // );
    }

    goToLecon(id: number){
        this.router.navigate(['leconQuiz', id], { relativeTo: this.route });
    }

    setStatus(lecon: ICoursOutputDto){
        if (lecon.active){
            this.leconService.disable(lecon.id).subscribe(
                response => {this.getData()},
                error => {console.error(error);}
            );
        } else {
            this.leconService.enable(lecon.id).subscribe(
                response => {this.getData()},
                error => {console.error(error);}
            );
        }
    }

    saveLecon() {
        this.submitted = true;

            if (this.lecon.id) {
                this.dataSend = {
                    id: this.lecon.id,
                    codeCours: this.lecon.codeCours,
                    nomCours: this.lecon.nomCours,
                    chapitreId: this.chapitreId,
                    active: this.lecon.active,
                }

                const ToSend = new CreateOrUpdateCoursInputDto(this.dataSend)

                this.leconService.createorupdate(ToSend).subscribe(
                    response => {this.getData()},
                    error => {console.error(error)}
                );

                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mot Modfié', life: 3000 });
            } else {
                this.dataSend = {
                    id: 0,
                    codeCours: this.createId(),
                    nomCours: this.lecon.nomCours,
                    chapitreId: this.chapitreId,
                    active: this.lecon.active,
                }

                console.log(this.dataSend)
                const ToSend = new CreateOrUpdateCoursInputDto(this.dataSend)

                this.leconService.createorupdate(ToSend).subscribe(
                    response => {this.getData()},
                    error => {console.error(error)}
                );

                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mot crée', life: 3000 });
            }

            this.leconDialog = false;
            this.lecon = {
                id: 0,
                codeCours: '',
                nomCours: '',
                active: false,
            };
    }

    openNew() {
        this.submitted = false;
        this.leconDialog = true;
    }

    editLecon(lecon: ICoursOutputDto) {
        this.lecon = { ...lecon };
        this.leconDialog = true;
    }

    hideDialog() {
        this.leconDialog = false;
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
