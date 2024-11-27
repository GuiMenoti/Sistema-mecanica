import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth"
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PendingRequest } from '../model/pending-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router, private afs : AngularFirestore) { }


  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then((credential) => {
      if (credential.user) {
        const uid = credential.user.uid;
  
        // Verificar o status do usuário na coleção 'pendingRequests'
        this.afs.collection('pendingRequests').doc(uid).get().toPromise().then(doc => {
          if (doc && doc.exists) {
            const userData = doc.data() as PendingRequest; // Cast para PendingRequest
            console.log(userData); // Exibe os dados do usuário
            localStorage.setItem('role', userData.role);
            if (userData && userData.status === 'approved') {
              // Se o status for aprovado, permite login e navegação
              localStorage.setItem('token', 'true');
              if (userData.role === 'admin') {
                // Se for admin, redireciona para o painel de administração
                localStorage.setItem('token', 'true');
                this.router.navigate(['dashboard']);
              } else {
                // Se não for admin, redireciona para o painel de usuário normal
                localStorage.setItem('token', 'true');
                this.router.navigate(['dashboard']);
              }
          
            } else {
              // Se não for aprovado, bloqueia o login
              alert('Sua solicitação ainda não foi aprovada!');
              this.router.navigate(['/login']);
            }
          } else {
            alert('Usuário não encontrado em pendentes!');
            this.router.navigate(['/login']);
          }
        }).catch(err => {
          alert('Erro ao verificar o status da solicitação: ' + err.message);
          this.router.navigate(['/login']);
        });
      }
    }).catch(err => {
      alert('Erro no login: ' + err.message);
      this.router.navigate(['/login']);
    });
  }

register(email: string, password: string, name: string) {  // name é adicionado aqui
  // Criação de usuário no Firebase Auth
  return this.fireauth.createUserWithEmailAndPassword(email, password)
    .then((credential) => {
      if (credential && credential.user) {
        const user = credential.user;

        // Adiciona uma solicitação pendente na coleção 'pendingRequests'
        return this.afs.collection('pendingRequests').doc(user.uid).set({
          email: user.email,
          uid: user.uid,
          createdAt: new Date(),
          status: 'pending', // Define o status como 'pendente'
          role: 'pending',
          name: name // Adiciona o nome do usuário
        }).then(() => {
          alert("Solicitação enviada com sucesso! Aguarde a aprovação de um recrutador.");
          this.router.navigate(['/login']); // Redireciona para login após o registro
        });
      } else {
        throw new Error('Usuário é nulo');
      }
    })
    .catch(err => {
      alert('Erro ao registrar: ' + err.message);
      this.router.navigate(['/register']);
      throw err; // Lança o erro para ser tratado mais adiante, se necessário
    });
}

  //sign out

  logout() {
    this.fireauth.signOut(). then (() =>{
      localStorage.removeItem('token')
      this.router.navigate(['/login']);
    }, err => {
     alert(err.message)
    })
  }

  

  //forgotPassword

  forgotPassword(email: string) {
  this.fireauth.sendPasswordResetEmail(email).then(() => {
    this.router.navigate(['/varify-email']);
  }, err => {
    alert("Something went wrong")
  })
  }

  getUsers() {
    return this.afs.collection('users').valueChanges();
  }

  getPendingRequests() {
    return this.afs.collection<PendingRequest>('pendingRequests', ref => ref.where('status', '==', 'pending')).snapshotChanges();
  }
  
  updateRequestStatus(uid: string, status: string) {
    // Atualiza o status da solicitação na coleção 'pendingRequests'
    return this.afs.collection('pendingRequests').doc(uid).update({
      status: status, // Pode ser 'approved' ou 'rejected'
      updatedAt: new Date() // Adiciona o campo 'updatedAt' para registrar a data da atualização
    });
  }
 
  approveRequest(uid: string, role: string) {
    // Recupera os dados da solicitação pendente
    this.afs.collection('pendingRequests').doc(uid).get().toPromise().then(doc => {
      if (doc && doc.exists) {
        const userData = doc.data() as PendingRequest;
        if (userData) {
        
          
          // Verifica se o valor do role é válido
          if (role === 'admin' || role === 'user') {
            // Atualiza o papel do usuário
            userData.role = role;
            
            // Move o usuário para a coleção de 'users' com o papel selecionado
            this.afs.collection('users').doc(uid).set(userData).then(() => {
              // Remove o usuário da coleção 'pendingRequests'
              this.afs.collection('pendingRequests').doc(uid).delete();
              alert('Usuário aprovado com o papel ' + role + '!');
            }).catch(err => {
              console.error('Erro ao adicionar usuário:', err);
              alert('Erro ao adicionar usuário à coleção de usuários.');
            });
          } else {
            alert("Papel inválido. O papel deve ser 'admin' ou 'user'.");
          }
        }
      } else {
        alert('Solicitação não encontrada.');
      }
    }).catch(err => {
      console.error('Erro ao aprovar solicitação:', err);
      alert('Ocorreu um erro ao aprovar a solicitação.');
    });
  }

   
  
  getUserRole(uid: string): Promise<string | null> {
    return this.afs.collection('users').doc(uid).get().toPromise().then(doc => {
      if (doc && doc.exists) {
        const data = doc.data() as { role?: string };
        return data?.role || null;
      } else {
        return null;
      }
    });
  }
}


