import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Product } from 'src/app/main/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/main/service/product.service';
=======
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/main/service/product.service';
import { CreateOrUpdateUtilisateurInputDto, ICreateOrUpdateUtilisateurInputDto, IUtilisateurOutputDto, RoleOutputDto, UtilisateurOutputDto, UtilisateurServiceProxy, RolesServiceProxy } from 'src/app/shared/service-proxies/service-proxies';
>>>>>>> origin/jessica

@Component({
    templateUrl: './utilisateur.component.html',
    providers: [MessageService]
})
<<<<<<< HEAD
export class UtilisateurComponent implements OnInit {

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
=======

export class UtilisateurComponent implements OnInit {
    utilisateurDialog: boolean = false;
    utilisateurs: UtilisateurOutputDto[] = [];
    utilisateur: IUtilisateurOutputDto = {
        id: 0,
        email: '',
        roleId: 0,
        statut: '',
        utilisateurId: 0,
        roleName: '',
        active: false
    };
    selectedUtilisateur: IUtilisateurOutputDto = {
        id: 0,
        email: '',
        roleId: 0,
        statut: '',
        utilisateurId: 0,
        roleName: '',
        active: false
    };
    submitted: boolean = false;
    statusList = {
        enable: "enable",
        disable: "disable"
    };
    rowsPerPageOptions = [5, 10, 20];
    dataSend: ICreateOrUpdateUtilisateurInputDto = {
        id: 0,
        email: '',
        roleId: 0,
        statut: '',
        utilisateurId: 0,
        roleName: ''
    };
    roles: RoleOutputDto[] = []; // Liste des rôles disponibles
    status: boolean = true;
onClickFunction: any;

    constructor(private productService: ProductService, private messageService: MessageService, private utilisateurService: UtilisateurServiceProxy, private roleService: RolesServiceProxy) { }

    ngOnInit() {
        this.getAllUtilisateurs();
        this['getAllRoles'](); // Appel de la méthode pour charger les rôles
        this.statusList = {
            enable: "enable",
            disable: "disable"
        };
    }
    getAllRoles() {
        this.roleService.getall().subscribe(
            (data: RoleOutputDto[]) => {
                this.roles = data;
                console.log(this.roles);
            },
            error => {
                console.error(error);
            }
        );
    }
    getAllUtilisateurs() {
        this.utilisateurService.getall().subscribe(data => {
            this.utilisateurs = data;
        });
    }

    setStatus(user: IUtilisateurOutputDto){
        if (user.active){
            this.utilisateurService.disable(user.utilisateurId).subscribe(
                response => {this.getAllUtilisateurs()},
                error => {console.error(error);}
            );
        } else {
            this.utilisateurService.enable(user.utilisateurId).subscribe(
                response => {this.getAllUtilisateurs()},
                error => {console.error(error);}
            );
        }
    }

    openNew() {
        this.submitted = false;
        this.utilisateurDialog = true;
    }

    toggleUserActivation(utilisateur: IUtilisateurOutputDto) {
        const data: ICreateOrUpdateUtilisateurInputDto = {
            id: utilisateur.utilisateurId,
            email: utilisateur.email,
            roleId: utilisateur['roleId'],
            statut: utilisateur.active ? this.statusList.disable : this.statusList.enable,
            utilisateurId: utilisateur.utilisateurId,
            roleName: utilisateur.roleName
        };

        const toSend = new CreateOrUpdateUtilisateurInputDto(data);

        this.utilisateurService.createorupdate(toSend).subscribe(
            response => {
                this.getAllUtilisateurs();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: `Utilisateur ${utilisateur.active ? 'désactivé' : 'activé'} avec succès`,
                    life: 3000
                });
            },
            error => {
                console.error(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: `Une erreur s'est produite lors de la ${utilisateur.active ? 'désactivation' : 'activation'} de l'utilisateur`,
                    life: 3000
                });
            }
        );
    }

    editUtilisateur(utilisateur: IUtilisateurOutputDto) {
        this.utilisateur = { ...utilisateur };
        this.utilisateurDialog = true;
    }

    confirmDelete() {
        this.utilisateurs = this.utilisateurs.filter(val => val.utilisateurId !== this.utilisateur.utilisateurId);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur supprimé', life: 3000 });
    }

    hideDialog() {
        this.utilisateurDialog = false;
        this.submitted = false;
    }
    


    saveUtilisateur() {
        this.submitted = true;

        if (this.utilisateur.email.trim() && this.utilisateur.roleName.trim()) {
            this.dataSend = {
                id: this.utilisateur.utilisateurId,
                email: this.utilisateur.email,
                roleId: this.utilisateur['roleId'],
                statut: this.utilisateur['statut'],
                utilisateurId: this.utilisateur.utilisateurId,
                roleName: this.utilisateur.roleName
            };

            const toSend = new CreateOrUpdateUtilisateurInputDto(this.dataSend);

            this.utilisateurService.createorupdate(toSend).subscribe(
                response => {
                    this.getAllUtilisateurs();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur modifié', life: 3000});
                },
                error => {
                    console.error(error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de la modification ou mise à jour de utilisateur', life: 3000});
                }
            );
    
            this.utilisateurDialog = false;
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.utilisateurs.length; i++) {
            if (this.utilisateurs[i].utilisateurId === id) {
>>>>>>> origin/jessica
                index = i;
                break;
            }
        }
<<<<<<< HEAD

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
=======
        return index;
    }

    createId(): number {
        let id = '';
        const chars = '1234567890';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return parseInt(id);
>>>>>>> origin/jessica
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
