import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { RolesServiceProxy, RoleOutputDto, IRoleOutputDto,CreateOrUpdateRoleInputDto, ICreateOrUpdateRoleInputDto,PermissionsServiceProxy,PermissionOutputDto} from 'src/app/shared/service-proxies/service-proxies';

@Component({
    templateUrl: './role.component.html',
    providers: [MessageService]
})

export class RoleComponent implements OnInit {
[x: string]: any;
    deleteRoleDialog: boolean = false;
    roleDialog: boolean = false;
    roles: RoleOutputDto[] = [];
    role: IRoleOutputDto = {
        id: 0,
        designation: '',
        codeRole: '',
        active: false,
        permissions: []
    };
    selectedRoles: IRoleOutputDto[] = [];
    submitted: boolean = false;
    statusList: any = {};
    rowsPerPageOptions = [5, 10, 20];
    dataToSend: ICreateOrUpdateRoleInputDto = {
        id: 0,
        designation: '',
        codeRole: ''
    };

    permissions: PermissionOutputDto[] = [];

    constructor(
        private roleServiceProxy: RolesServiceProxy,
        private messageService: MessageService,
        private permissionServiceProxy: PermissionsServiceProxy,
    ) {}

    ngOnInit() {
        this.getAllRoles();
        this.getAllPermissions();
        this.statusList = {
            enable: "enable",
            disable: "disable"

        };
    }

    getAllPermissions() {
        // Appeler la méthode getAllPermissions pour récupérer les permissions depuis le service d'API 
        this['permissionServiceProxy'].getallpermissions().subscribe(
            (data: PermissionOutputDto[]) => {
                // this.permissions = data;
            },
            (error: any) => {
                console.error('Error fetching permissions:', error);
                this.messageService.add({ 
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Erreur lors du chargement des permissions',
                    life: 3000
                })
                // Gérer les erreurs de manière appropriée, par exemple afficher un message à l'utilisateur
            }
        )
    }

    getAllRoles() {
        // Appeler la méthode getAllRoles pour récupérer les rôles depuis le service d'API RolesServiceProxy
        this.roleServiceProxy.getall().subscribe(
            (data: RoleOutputDto[]) => {
                this.roles = data;
            },
            error => {
                console.error('Error fetching roles:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Erreur lors du chargement des rôles',
                    life: 3000
                });
                // Gérer les erreurs de manière appropriée, par exemple afficher un message à l'utilisateur
            }
        );
    }

    editRole(role: IRoleOutputDto) {
        this.submitted = false;
        this.roleDialog = true;
        this.role = {...role };
    }

    deleteRole() {
        this.roleServiceProxy.getall().subscribe(
            (roles: RoleOutputDto[]) => {
                const index = this['findIndexById'](this.role.id);
                if (index > -1) {
                    roles.splice(index, 1);
                    this.roles = [...roles];
                }
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Rôle supprimé', life: 3000 });
                this.deleteRoleDialog = false;
            },
            (error: any) => {
                console.error('Error deleting role:', error);
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression du rôle', life: 3000 });
            }
        );
    }

    setStatus(role: IRoleOutputDto) {
        const operation = role.active ? this.roleServiceProxy.disable(role.id) : this.roleServiceProxy.enable(role.id);
        operation.subscribe(
            response => {
                this.getAllRoles();
                this.messageService.add({ severity:'success', summary: 'Succès', detail: `Rôle ${role.active? 'désactivé' : 'activé'}`, life: 3000 });
            },
            error => {
                console.error('Error changing role status:', error);
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la modification du statut du rôle', life: 3000 });
            }
        );
    }
    
    openNew() {
        this.submitted = false;
        this.roleDialog = true;
        this.role = {
            id: 0,
            designation: '',
            codeRole: '',
            active: false,
            permissions: [],
        };
    }

    removePermission(index: number) {
        this.role['permissions'].splice(index, 1);
        this.role['permissions'] = [...this.role['permissions']];
    }
    
    toggleRoleActivation(role: IRoleOutputDto) {
        const data: ICreateOrUpdateRoleInputDto = {
            id: role.id,
            designation: role.designation,
            codeRole: role.codeRole,
            statut: role.active ? this.statusList.disable : this.statusList.enable,
            roleId: role.id,
            permissions: role['permissions'].map((p: { permissionId: any; }) => p.permissionId)
        };

        const toSend = new CreateOrUpdateRoleInputDto(data);

        this.roleServiceProxy.createorupdate(toSend).subscribe(
            response => {
                this.getAllRoles();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: `Rôle ${role.active ? 'désactivé' : 'activé'} avec succès`,
                    life: 3000
                });
            },
            error => {
                console.error('Error updating role:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: `Une erreur s'est produite lors de la ${role.active ? 'désactivation' : 'activation'} du rôle`,
                    life: 3000
                });
            }
        );
    }

    saveRole() {
        this.submitted = true;

        if (this.role.designation?.trim() && this.role.codeRole?.trim()) {
            this.dataToSend = {
                id: this.role.id,
                designation: this.role.designation,
                codeRole: this.role.codeRole,
                statut: this.role.active? this.statusList.enable : this.statusList.disable,
                roleId: this.role.id,
                permissions: this.role['permissions'].map((p: { permissionId: any; }) => p.permissionId)
            };
        } else {
            this.dataToSend = {
                id: 0,
                designation: this.role.designation,
                codeRole: this.role.codeRole,
                statut: this.role.active? this.statusList.enable : this.statusList.disable,
                roleId: this.role.id,
                permissions: this.role['permissions'].map((p: { permissionId: any; }) => p.permissionId)
            };
        }

        const toSend = new CreateOrUpdateRoleInputDto(this.dataToSend);

        this.roleServiceProxy.createorupdate(toSend).subscribe(
            response => {
                this.getAllRoles();
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Rôle modifié', life: 3000 });
            },
            error => {
                console.error('Error saving role:', error);
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la création ou mise à jour du rôle', life: 3000 });
            }
        );

        this.roleDialog = false;
    }

    addPermission() {
        this.role['permissions'].push({
            permissionId: this.createId(),
            intitule: '',
            codePermission: ''
        });
      }

    confirmDelete(role: IRoleOutputDto) {
        this.deleteRoleDialog = true;
        this.role = role;
    }
    
    hideDialog() {
        this.roleDialog = false;
        this.deleteRoleDialog = false;
        this.submitted = false;
    }

    findIndexById(id: number): number {
        return this.roles.findIndex(role => role.id === id);
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

    getPermissionLabel(permissionId: number): string {
        const permission = this.permissions.find(p => p['id'] === permissionId);
        return permission ? permission.intitule : 'Inconnu';
    }
}