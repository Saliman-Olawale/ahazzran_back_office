import { ConteOutputDto, ContenulangueServiceProxy, ContesServiceProxy, DictionnaireOutputDto, DictionnaireServiceProxy, FileParameter, IConteOutputDto, IContenuLangueOutputDto, ILangueGroupDto, ILangueOutputDto, LangueOutputDto } from './../../../../../shared/service-proxies/service-proxies';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/main/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IDictionnaireOutputDto } from 'src/app/shared/service-proxies/service-proxies';
import { ActivatedRoute } from '@angular/router';
// CreateOrUpdateContenuLangueInputDto
// ICreateOrUpdateContenuLangueInputDto
@Component({
    templateUrl: './dictionnaire-langues.component.html',
    providers: [MessageService]
})
export class DictionnaireLanguesComponent implements OnInit {

    selectedDictionnaireId: any;
    selectedDictionnaire: any;
    selectedConteId: any;
    selectedConte: any;

    dictionnaire: Boolean = true;
    conte: Boolean = false;

    currentLangue: ILangueOutputDto = {
        langueId: 0,
        nom: '',
        codeLangue: '',
        active: false,
        image: '',
    }
    
    currentDictionnaire: IContenuLangueOutputDto[] = []
    currentConte: ConteOutputDto[] = []

    langueId!: number;

    dico: IDictionnaireOutputDto[] = [];

    diict: IDictionnaireOutputDto = {
        dictionnaireId: 0,
        dictionnaireType: '',
        mot: '',
        active: false,
        image: '',
    }

    dictDialog: boolean = false;

    dict: IContenuLangueOutputDto = {
        id: 0,
        mot: '',
        langueId: 0,
        dictionnaireId: 0,
        audio: '',
        active: false,
        image: '',
    };

    cont: IConteOutputDto = {
        id: 0,
        nom: '',
        contenuConte: '',
        audioConte: '',
        active: false,
    }

    dataSendCL: ICreateOrUpdateContenuLangueInputDto = {
        id: 0,
        mot: '',
        langueId: 0,
        dictionnaireId: 0,
        audio: '',
    };

    // dataSendC: ICreateOrUpdateCon = {
    //     id: 0,
    //     mot: '',
    //     langueId: 0,
    //     dictionnaireId: 0,
    //     audio: '',
    // };

    fileToSend: FileParameter = {
        data: null,
        fileName: "",
    };

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    rowsPerPageOptions = [5, 10, 20];

    constructor(private messageService: MessageService, public contenulangueService: ContenulangueServiceProxy, public conteService:  ContesServiceProxy,private route: ActivatedRoute, private dictionnaireService: DictionnaireServiceProxy) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.langueId = +params['id'];
        });
        this.getData();
    }

    setView() {
        if (this.conte) {
            this.conte = false;
            this.dictionnaire = true;
        } else {
            this.conte = true;
            this.dictionnaire = false;
        }
    }

    getData() {
        this.contenulangueService.getone(this.langueId).subscribe(
            (data) => {
                this.currentLangue = data.langue;
                this.currentDictionnaire = data.contenus;
            }, (error) => console.error(error)
        );

        this.dictionnaireService.getall().subscribe(
            (data) => {
                this.dico = data;
            }, (error) => console.error(error)
        );
    }

    onDropdownValueChange() {
        this.selectedDictionnaire = this.dico.find(item => item.dictionnaireId === this.selectedDictionnaireId);
    }

    openNew() {
        if (this.dictionnaire) {
            this.dict = {
                id: 0,
                mot: '',
                langueId: this.langueId,
                dictionnaireId: 0,
                audio: '',
                active: false,
                image: '',
            };
            this.submitted = false;
            this.dictDialog = true;
        }
    }

    editMot(dict: IContenuLangueOutputDto) {
        this.dict = { ...dict };
        this.dictDialog = true;
    }

    onAudioSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.fileToSend.fileName = file.name;
            this.fileToSend.data = file;
        }
    }

    // onFileSelected(event: any) {
    //     const file: File = event.target.files[0];
    //     const reader = new FileReader();

    //     reader.onload = (e: any) => {
    //         this.dict.image = file.name; //e.target.result;
    //     };

    //     reader.readAsDataURL(file);
    // }

    hideDialog() {
        this.dictDialog = false;
        this.submitted = false;
    }

    saveMot() {
        this.submitted = true;

        if (this.dict.mot?.trim()) {
            if (this.dict.dictionnaireId) {
                this.dataSendCL = {
                    id: this.dict.dictionnaireId,
                    dictionnaireId: this.dict.dictionnaireId,
                    mot: this.dict.mot,
                    audio: this.dict.audio,
                    langueId: this.langueId,
                }

                const ToSend = new CreateOrUpdateContenuLangueInputDto(this.dataSendCL)

                this.contenulangueService.createorupdate(ToSend.toJSON(), this.fileToSend).subscribe(
                    response => { this.getData() },
                    error => { console.error(error) }
                );

                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mot Modfié', life: 3000 });
            } else {
                this.dataSendCL = {
                    id: 0,
                    dictionnaireId: this.selectedDictionnaire.dictionnaireId,
                    mot: this.dict.mot,
                    audio: this.dict.audio,
                    langueId: this.langueId,
                }

                console.log(this.dataSendCL)
                const ToSend = new CreateOrUpdateContenuLangueInputDto(this.dataSendCL)

                this.contenulangueService.createorupdate(ToSend.toJSON(), this.fileToSend).subscribe(
                    response => { this.getData() },
                    error => { console.error(error) }
                );

                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mot crée', life: 3000 });
            }

            this.dictDialog = false;
            this.dict = {
                id: 0,
                mot: '',
                langueId: this.langueId,
                dictionnaireId: 0,
                audio: '',
                active: false,
                image: '',
            };
        }
    }

    setStatus(dict: IContenuLangueOutputDto) {
        if (dict.active) {
            this.contenulangueService.disable(dict.dictionnaireId).subscribe(
                response => { this.getData() },
                error => { console.error(error); }
            );
        } else {
            this.contenulangueService.enable(dict.dictionnaireId).subscribe(
                response => { this.getData() },
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

    filterCountry(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.dico.length; i++) {
            const dicoi = this.dico[i];
            if (dicoi.mot.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(dicoi);
            }
        }

        return this.dico = filtered;
    }
}

interface ICreateOrUpdateContenuLangueInputDto {
    id: number;
    mot: string;
    langueId: number;
    dictionnaireId: number;
    audio: string;

    [key: string]: any;
}

class CreateOrUpdateContenuLangueInputDto implements ICreateOrUpdateContenuLangueInputDto {
    id!: number;
    mot!: string;
    langueId!: number;
    dictionnaireId!: number;
    audio!: string;

    [key: string]: any;

    constructor(data?: ICreateOrUpdateContenuLangueInputDto) {
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
            this.id = _data["id"];
            this.mot = _data["mot"];
            this.langueId = _data["langueId"];
            this.dictionnaireId = _data["dictionnaireId"];
            this.audio = _data["audio"];

        }
    }

    static fromJS(data: any): CreateOrUpdateContenuLangueInputDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateOrUpdateContenuLangueInputDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (this.hasOwnProperty(property))
                data[property] = this[property];
        }
        data["id"] = this.id;
        data["mot"] = this.mot;
        data["langueId"] = this.langueId;
        data["dictionnaireId"] = this.dictionnaireId;
        data["audio"] = this.audio;
        return data;
    }
}