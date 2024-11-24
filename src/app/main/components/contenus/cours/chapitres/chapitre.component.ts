import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/main/service/product.service';
import { CreateOrUpdateChapitreInputDto, ICreateOrUpdateChapitreInputDto, IChapitreOutputDto, ChapitreOutputDto, ChapitresServiceProxy } from 'src/app/shared/service-proxies/service-proxies';
import { ActivatedRoute, Router } from '@angular/router';
=======
import { Product } from 'src/app/main/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/main/service/product.service';
>>>>>>> origin/jessica

@Component({
    templateUrl: './chapitre.component.html',
    providers: [MessageService]
})
export class ChapitreComponent implements OnInit {

<<<<<<< HEAD
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
>>>>>>> origin/jessica
    }

    createId(): string {
        let id = '';
<<<<<<< HEAD
        const chars = '1234567890';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    createCode(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVW';
=======
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
>>>>>>> origin/jessica
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
<<<<<<< HEAD

}
=======
}
>>>>>>> origin/jessica
