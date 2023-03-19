
import { Injectable } from '@angular/core';
import {
  CanLoad, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route
} from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from '../../login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticaGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.verificaAcesso();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    console.log('canLoad: verificando permissão de usuário');
    return this.verificaAcesso();
  }

  private verificaAcesso(): boolean {
    if (this.loginService.usuarioAutenticado()) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
 }

} // fim classe
