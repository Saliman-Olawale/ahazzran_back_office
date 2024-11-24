import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CreateOrUpdateLangueInputDto, ICreateOrUpdateLangueInputDto, ILangueOutputDto, LanguesServiceProxy } from 'src/app/shared/service-proxies/service-proxies';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './langue.component.html',
    providers: [MessageService]
})
export class LangueComponent implements OnInit {

    langueDialog: boolean = false;

    langues: ILangueOutputDto[] = [];

    langue: ILangueOutputDto = {
        langueId: 0,
        nom: '',
        codeLangue: '',
        active: false
    };

    submitted: boolean = false;

    status: boolean = true;

    rowsPerPageOptions = [5, 10, 20];

    dataSend: ICreateOrUpdateLangueInputDto = {
        id: 0,
        nom: '',
        code: '',
        active: false
    };

    statusList: any = {};

    constructor( private languesService: LanguesServiceProxy, private messageService: MessageService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.getAlll()
    }

    getAlll() {
        this.languesService.getall().subscribe((data) => {
            this.langues = data;
        })
    }

    goToDicoLangue(langueId: number){
        this.router.navigate(['dictionnaireLangues', langueId], { relativeTo: this.route });
    }

    openNew() {
        this.langue = {
            langueId: 0,
            codeLangue: '',
            nom: '',
            active: false
        };
        this.submitted = false;
        this.langueDialog = true;
    }

    editLangue(langue: ILangueOutputDto) {
        this.langue = { ...langue };
        this.langueDialog = true;
    }

    hideDialog() {
        this.langueDialog = false;
        this.submitted = false;
    }

    saveLangue() {
        this.submitted = true;

        if (this.langue.nom?.trim()) {
            if (this.langue.langueId) {

                this.dataSend = {
                    id: this.langue.langueId,
                    code: this.langue.codeLangue,
                    nom: this.langue.nom,
                    active: this.langue.active
                }
                const ToSend = new CreateOrUpdateLangueInputDto(this.dataSend)

                this.languesService.createorupdate(ToSend).subscribe(
                    response => {this.getAlll()},
                    error => {console.error(error)}
                );

                this.messageService.add({ severity: 'success', summary: 'Successful', detail: ' Langue créée', life: 3000 });
            } else {
                this.dataSend = {
                    id: 0,
                    code: this.createId(),
                    nom: this.langue.nom,
                    active: true
                }

                const ToSend = new CreateOrUpdateLangueInputDto(this.dataSend)

                this.languesService.createorupdate(ToSend).subscribe(
                    response => {this.getAlll()},
                    error => {console.error(error);}
                );

                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.langueDialog = false;
            this.langue = {
                langueId: 0,
                nom: '',
                codeLangue: '',
                active: false
            };
        }
    }

    setStatus(langue: ILangueOutputDto){
        if (langue.active){
            this.languesService.disable(langue.langueId).subscribe(
                response => {this.getAlll()},
                error => {console.error(error);}
            );
        } else {
            this.languesService.enable(langue.langueId).subscribe(
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
