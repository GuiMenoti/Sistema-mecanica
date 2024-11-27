import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userRole = localStorage.getItem('role')?.trim().toLowerCase(); // Normaliza o valor
    
    if (userRole === 'admin') {
      return true;
    } else {
      alert("Sem permissão para acessar esta página.");
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
