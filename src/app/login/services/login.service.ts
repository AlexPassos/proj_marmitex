import { Observable } from 'rxjs';
import { Api } from './../../shared/constants/api';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: Api;

  private apiURL: string;
  private login: string;
  private senha: string;

  //private usuario: Observable<Usuarios>;
  private autenticado: boolean = false;

  mostrarMenu = new EventEmitter<boolean>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {}

  verificarLogin(login: string, senha: string): void {

    this.login = login;
    this.senha = senha;

    this.apiURL = `${this.url.urlApi}/usuario/${login}/${senha}`;

    //this.httpClient.get<Usuarios>(this.apiURL).subscribe(dados => this.verificaDados(dados));

  }

  verificaDados(dados): void{

    if (this.login === dados.login && this.senha === dados.senha){
      this.autenticado = true;
      this.mostrarMenu.emit(true);
      this.router.navigate(['/']);
    } else {
      this.autenticado = false;
      this.mostrarMenu.emit(false);
    }

  }

  usuarioAutenticado(): boolean {
    return this.autenticado;
  }

}
