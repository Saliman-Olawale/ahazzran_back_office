import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/main/service/product.service';
import { CreateOrUpdateLangueInputDto, ICreateOrUpdateLangueInputDto, ILangueOutputDto, LangueOutputDto, LanguesServiceProxy } from 'src/app/shared/service-proxies/service-proxies';

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
        active: false,
    };

    selectedLangues: ILangueOutputDto[] = [];

    submitted: boolean = false;

    status: boolean = true;

    rowsPerPageOptions = [5, 10, 20];

    dataSend: ICreateOrUpdateLangueInputDto = {
        id: 0,
        nom: '',
        code: '',
        statut: ""
    };

    statusList: any = {};

    constructor(private productService: ProductService, private languesService: LanguesServiceProxy, private messageService: MessageService) { }

    ngOnInit() {
        this.getAlll()

        this.statusList = {
            enable: "enable",
            disable: "disable"
        }
    }

    getAlll() {
        this.languesService.getall().subscribe((data) => {
            this.langues = data;
        })
    }



    openNew() {

        this.submitted = false;
        this.langueDialog = true;
    }

    disableLangues() {
        const languesA = this.langues.filter(val => !this.selectedLangues.includes(val));
        languesA.forEach(element => {
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Langue désactivée', life: 3000 });
    }

    editLangue(langue: ILangueOutputDto) {
        this.langue = { ...langue };
        this.langueDialog = true;
    }

    confirmDelete() {
        this.langues = this.langues.filter(val => val.langueId !== this.langue.langueId);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Langue Deleted', life: 3000 });

    }

    hideDialog() {
        this.langueDialog = false;
        this.submitted = false;
    }

    saveLangue() {
        this.submitted = true;

        if (this.langue.nom?.trim() && this.langue.codeLangue?.trim()) {
            if (this.langue.langueId) {

                this.dataSend = {
                    id: this.langue.langueId,
                    code: this.langue.codeLangue,
                    nom: this.langue.nom,
                    statut: this.statusList.enable
                }
                const ToSend = new CreateOrUpdateLangueInputDto(this.dataSend)

                this.languesService.createorupdate(ToSend).subscribe(
                    response => {this.getAlll()},
                    error => {console.error(error)}
                );

                this.messageService.add({ severity: 'success', summary: 'Successful', detail: ' Langue créée', life: 3000 });
            } else {
                this.langue.langueId = this.createId();

                this.dataSend = {
                    id: 0,
                    code: this.langue.codeLangue,
                    nom: this.langue.nom,
                    statut: this.statusList.enable
                }

                const ToSend = new CreateOrUpdateLangueInputDto(this.dataSend)

                this.languesService.createorupdate(ToSend).subscribe(
                    response => {this.getAlll()},
                    error => {console.error(error);}
                );

                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.langueDialog = false;

        }
    }



    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.langues.length; i++) {
            if (this.langues[i].langueId === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): number {
        let id = '';
        const chars = '1234567890';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return parseInt(id);
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
