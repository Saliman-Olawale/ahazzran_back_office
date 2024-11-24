import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/main/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/main/service/product.service';
import { CreateOrUpdateUtilisateurInputDto, DictionnaireOutputDto, DictionnaireServiceProxy, FileParameter, IDictionnaireOutputDto } from 'src/app/shared/service-proxies/service-proxies';

@Component({
    templateUrl: './dictionnaire-francais.component.html',
    providers: [MessageService]
})
export class DictionnaireFrancaisComponent implements OnInit {

    dictDialog: boolean = false;

    dictionnaires: IDictionnaireOutputDto[] = [];

    dict: IDictionnaireOutputDto = {
        dictionnaireId: 0,
        mot: "",
        active: false,
        image: "",
        dictionnaireType: "",
    };

    dataSend: IDictionnaireInputDto = {
        dictionnaireId: 0,
        mot: "",
        dictionnaireType: "",
    }

    fileToSend: any = {};
    userFile: any;
    imgURL: any;
    public imagePath: any;

    // FileParameter = {
    //     data: null,
    //     fileName: "",
    // };

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService, private messageService: MessageService, public dictionaireService: DictionnaireServiceProxy) { }

    ngOnInit() {
        this.dictionaireService.getall().subscribe(data => this.dictionnaires = data);
    }

    getAll() {
        this.dictionaireService.getall().subscribe(
            (data) => this.dictionnaires = data
        );
    }

    openNew() {
        this.dict = {
            dictionnaireId: 0,
            dictionnaireType: "",
            mot: "",
            active: false,
            image: "",
        };
        this.submitted = false;
        this.dictDialog = true;
    }

    editMot(dict: IDictionnaireOutputDto) {
        this.dict = { ...dict };
        this.dictDialog = true;
    }

    // onFileSelected(event: any) {
    //     const file: File = event.target.files[0];

    //     if (file) {
    //         this.fileToSend.fileName = file.name;
    //         this.fileToSend.data = file; // Stocker directement l'objet File
    //     }
    // }

    onFileSelected(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.userFile = file;

            var mimeType = event.target.files[0].type;
            if (mimeType.match(/image\/*/) == null) {
                return;
            }

            var reader = new FileReader();

            this.imagePath = file;
            reader.readAsDataURL(file);
            reader.onload = (event: any) => {
                this.imgURL = reader.result;
            }

            this.fileToSend.fileName = this.userFile.name;
            this.fileToSend.data = this.userFile;
        }
    }

    hideDialog() {
        this.dictDialog = false;
        this.submitted = false;
    }

    saveMot() {
        this.submitted = true;

        if (this.dict.mot?.trim()) {
            if (this.dict.dictionnaireId) {
                this.dataSend = {
                    dictionnaireId: this.dict.dictionnaireId,
                    mot: this.dict.mot,
                    dictionnaireType: this.dict.dictionnaireType,
                }

                const ToSend = new CreateOrUpdateDicoInputDto(this.dataSend)
                this.dictionaireService.createorupdate(ToSend.toJSON(), this.fileToSend).subscribe(
                    response => { this.getAll() },
                    error => { console.error(error) }
                );

                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mot Modfié', life: 3000 });
            } else {
                this.dataSend = {
                    dictionnaireId: 0,
                    dictionnaireType: "Mot",
                    mot: this.dict.mot,
                }

                console.log(this.dataSend)
                const ToSend = new CreateOrUpdateDicoInputDto(this.dataSend)

                console.log(JSON.stringify(ToSend.toJSON()))
                console.log(this.fileToSend)

                this.dictionaireService.createorupdate(JSON.stringify(ToSend.toJSON()), this.fileToSend).subscribe(
                    response => { this.getAll() },
                    error => { console.error(error) }        
                );

                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mot crée', life: 3000 });
            }

            this.dictDialog = false;
            this.dict = {
                dictionnaireId: 0,
                dictionnaireType: "",
                mot: "",
                active: false,
                image: "",
            };
        }
    }

    setStatus(dict: IDictionnaireOutputDto) {
        if (dict.active) {
            this.dictionaireService.disable(dict.dictionnaireId).subscribe(
                response => { this.getAll() },
                error => { console.error(error); }
            );
        } else {
            this.dictionaireService.enable(dict.dictionnaireId).subscribe(
                response => { this.getAll() },
                error => { console.error(error); }
            );
        }
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


// interface IDictionnaireOutputDto {

//     dictionnaireId: number;
//     mot: string;
//     active: boolean;
//     image: string;
//     dictionnaireType: string;

//     [key: string]: any;
// }

interface IDictionnaireInputDto {
    dictionnaireId: number;
    mot: string;
    dictionnaireType: string;   

    [key: string]: any;
}

class CreateOrUpdateDicoInputDto implements IDictionnaireInputDto {
    dictionnaireId!: number;
    mot!: string;
    dictionnaireType!: string;

    [key: string]: any;

    constructor(data?: IDictionnaireInputDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            for (var property in _data) {
                if (_data.hasOwnProperty(property))
                    this[property] = _data[property];
            }

            this.dictionnaireId = _data["dictionnaireId"];
            this.mot = _data["mot"];
            this.dictionnaireType = _data["dictionnaireType"];

        }
    }

    static fromJS(data: any): CreateOrUpdateDicoInputDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateOrUpdateDicoInputDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (this.hasOwnProperty(property))
                data[property] = this[property];
        }

        data["dictionnaireId"] = this.dictionnaireId;
        data["mot"] = this.mot;
        data["dictionnaireType"] = this.dictionnaireType;
        return data;
    }
}