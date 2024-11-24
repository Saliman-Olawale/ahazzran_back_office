import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/main/service/product.service';
import { CreateOrUpdateUtilisateurInputDto, ICreateOrUpdateUtilisateurInputDto, IUtilisateurOutputDto, RoleOutputDto, UtilisateurOutputDto, UtilisateurServiceProxy, RolesServiceProxy } from 'src/app/shared/service-proxies/service-proxies';

@Component({
    templateUrl: './utilisateur.component.html',
    providers: [MessageService]
})

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

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
