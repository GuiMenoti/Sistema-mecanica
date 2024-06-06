import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth"
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router, private afs : AngularFirestore) { }

  //login
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['dashboard']);
    }).catch(err => {
      alert(err.message);
      this.router.navigate(['/login']);
    });
  }


  //registro
  register(email: string, password: string) {
    return this.fireauth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        if (credential && credential.user) {
          const user = credential.user;
          return this.afs.collection('users').doc(user.uid).set({
            email: user.email
            
          }).then(() => {
            return user.uid; 
          });
        } else {
          throw new Error('User is null');
        }
      })
      .then((userId) => {
        alert("Registrado com sucesso");
        this.router.navigate(['/login']);
        return userId; 
      })
      .catch(err => {
        alert(err.message);
        this.router.navigate(['/register']);
        throw err;
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

}


