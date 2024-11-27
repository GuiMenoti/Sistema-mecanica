import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    
    return this.afAuth.authState.pipe(
      take(1),
      map(user => !!user), // Verifica se há usuário autenticado
      tap(loggedIn => {
        if (!loggedIn) {
          // Redireciona para a página de login se o usuário não estiver autenticado
          this.router.navigate(['/login']);
        }
      })
    );
  }
}