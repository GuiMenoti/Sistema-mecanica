import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { KeyAdminService } from '../../shared/key-admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
 users: any[] = [];


  constructor(private auth : AuthService, private adminService : KeyAdminService) {}
   
    register() {
      
      this.auth.logout();
    
}



ngOnInit() {
  this.auth.getUsers().subscribe(users => {
    this.users = users;
  });
  
}

deleteUser(userId: string) {
  this.adminService.deleteUser(userId)
    .subscribe(
      () => {
        console.log('Usuário excluído com sucesso');
        this.users = this.users.filter(user => user.id !== userId);
      },
      error => {
        console.error('Erro ao excluir usuário:', error);
      }
    );
}
  
}