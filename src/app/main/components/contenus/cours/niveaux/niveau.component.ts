import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ActivatedRoute } from '@angular/router';
import { CoursServiceProxy, CreateOrUpdateNiveauInputDto, ICreateOrUpdateNiveauInputDto, INiveauOutputDto, NiveauServiceProxy } from 'src/app/shared/service-proxies/service-proxies';
=======
import { Product } from 'src/app/main/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/main/service/product.service';
>>>>>>> origin/jessica

@Component({
    templateUrl: './niveau.component.html',
    providers: [MessageService]
})
export class NiveauComponent implements OnInit {

<<<<<<< HEAD
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

=======
    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

>>>>>>> origin/jessica
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
