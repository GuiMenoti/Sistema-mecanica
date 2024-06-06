import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = "";
  password: string = "";

  constructor(private auth: AuthService) { }

  

  login() {

    console.log('Email:', this.email);  // Adicione este log para verificar o valor do e-mail
    console.log('Password:', this.password);  // 
    if (this.email === "") {
      alert("E-mail por favor");
      return;
    }
    if (!this.validateEmail(this.email)) {
      alert("Formato de e-mail inválido");
      return;
    }
    if (this.password === "") {
      alert("Senha por favor");
      return;
    }

    this.auth.login(this.email, this.password);
    this.email = "";
    this.password = "";
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

}
