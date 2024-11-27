import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';


@Component({
  selector: 'app-admin-request-components',
  templateUrl: './admin-request-components.component.html',
  styleUrl: './admin-request-components.component.scss'
})
export class AdminRequestComponentsComponent {
  pendingRequests: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getPendingRequests().subscribe(data => {
      console.log(data); // Verifique os dados recebidos
      this.pendingRequests = data.map(e => {
        const docData = e.payload.doc.data();
        return docData ? { id: e.payload.doc.id, ...docData } : { id: e.payload.doc.id };
      });
    });
  }
  
  approveRequest(uid: string, role: string) {
    if (!role) {
      alert('Por favor, selecione um papel antes de aprovar.');
      return;
    }
  
    // Atualiza o status e define o papel
    this.authService.updateRequestStatus(uid, role).then(() => {
      alert(`Solicitação aprovada como ${role}!`);
    }).catch(err => {
      alert('Erro ao aprovar a solicitação: ' + err.message);
    });
  }
  
  // Rejeitar a solicitação
  rejectRequest(uid: string) {
    // Atualiza o status para rejeitado
    this.authService.updateRequestStatus(uid, 'rejected').then(() => {
      alert('Solicitação rejeitada!');
    }).catch(err => {
      alert('Erro ao rejeitar a solicitação: ' + err.message);
    });
  }
 

  
}

