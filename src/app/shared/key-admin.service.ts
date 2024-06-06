import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class KeyAdminService {

  private apiUrl = 'http://localhost:3000'; 

  constructor(
    private http: HttpClient,
    private fireauth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ) { }

  deleteUser(userId: string) {
    console.log('ID do usuário:', userId);
   
    return this.http.delete(`${this.apiUrl}/deleteUser/${userId}`);
  }
}

