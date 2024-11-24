import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
<<<<<<< HEAD
import { CreateOrUpdateLangueInputDto, ICreateOrUpdateLangueInputDto, ILangueOutputDto, LanguesServiceProxy } from 'src/app/shared/service-proxies/service-proxies';
import { ActivatedRoute, Router } from '@angular/router';
=======
import { ProductService } from 'src/app/main/service/product.service';
import { CreateOrUpdateLangueInputDto, ICreateOrUpdateLangueInputDto, ILangueOutputDto, LangueOutputDto, LanguesServiceProxy } from 'src/app/shared/service-proxies/service-proxies';
>>>>>>> origin/jessica

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
<<<<<<< HEAD
        active: false
    };

=======
        active: false,
    };

    selectedLangues: ILangueOutputDto[] = [];

>>>>>>> origin/jessica
    submitted: boolean = false;

    status: boolean = true;

    rowsPerPageOptions = [5, 10, 20];

    dataSend: ICreateOrUpdateLangueInputDto = {
        id: 0,
        nom: '',
        code: '',
<<<<<<< HEAD
        active: false
=======
        statut: ""
>>>>>>> origin/jessica
    };

    statusList: any = {};

<<<<<<< HEAD
    constructor( private languesService: LanguesServiceProxy, private messageService: MessageService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.getAlll()
=======
    constructor(private productService: ProductService, private languesService: LanguesServiceProxy, private messageService: MessageService) { }

    ngOnInit() {
        this.getAlll()

        this.statusList = {
            enable: "enable",
            disable: "disable"
        }
>>>>>>> origin/jessica
    }

    getAlll() {
        this.languesService.getall().subscribe((data) => {
            this.langues = data;
        })
    }

<<<<<<< HEAD
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
=======


    openNew() {

>>>>>>> origin/jessica
        this.submitted = false;
        this.langueDialog = true;
    }

<<<<<<< HEAD
=======
    disableLangues() {
        const languesA = this.langues.filter(val => !this.selectedLangues.includes(val));
        languesA.forEach(element => {
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Langue désactivée', life: 3000 });
    }

>>>>>>> origin/jessica
    editLangue(langue: ILangueOutputDto) {
        this.langue = { ...langue };
        this.langueDialog = true;
    }

<<<<<<< HEAD
=======
    confirmDelete() {
        this.langues = this.langues.filter(val => val.langueId !== this.langue.langueId);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Langue Deleted', life: 3000 });

    }

>>>>>>> origin/jessica
    hideDialog() {
        this.langueDialog = false;
        this.submitted = false;
    }

    saveLangue() {
        this.submitted = true;

<<<<<<< HEAD
        if (this.langue.nom?.trim()) {
=======
        if (this.langue.nom?.trim() && this.langue.codeLangue?.trim()) {
>>>>>>> origin/jessica
            if (this.langue.langueId) {

                this.dataSend = {
                    id: this.langue.langueId,
                    code: this.langue.codeLangue,
                    nom: this.langue.nom,
<<<<<<< HEAD
                    active: this.langue.active
=======
                    statut: this.statusList.enable
>>>>>>> origin/jessica
                }
                const ToSend = new CreateOrUpdateLangueInputDto(this.dataSend)

                this.languesService.createorupdate(ToSend).subscribe(
                    response => {this.getAlll()},
                    error => {console.error(error)}
                );

                this.messageService.add({ severity: 'success', summary: 'Successful', detail: ' Langue créée', life: 3000 });
            } else {
<<<<<<< HEAD
                this.dataSend = {
                    id: 0,
                    code: this.createId(),
                    nom: this.langue.nom,
                    active: true
=======
                this.langue.langueId = this.createId();

                this.dataSend = {
                    id: 0,
                    code: this.langue.codeLangue,
                    nom: this.langue.nom,
                    statut: this.statusList.enable
>>>>>>> origin/jessica
                }

                const ToSend = new CreateOrUpdateLangueInputDto(this.dataSend)

                this.languesService.createorupdate(ToSend).subscribe(
                    response => {this.getAlll()},
                    error => {console.error(error);}
                );

                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.langueDialog = false;
<<<<<<< HEAD
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
=======

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
>>>>>>> origin/jessica
        let id = '';
        const chars = '1234567890';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
<<<<<<< HEAD
        return id;
=======
        return parseInt(id);
>>>>>>> origin/jessica
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
<<<<<<< HEAD

=======
>>>>>>> origin/jessica
}
