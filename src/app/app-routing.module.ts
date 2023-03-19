import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { PaginaerrorComponent } from './paginaerror/paginaerror.component';
import { AutenticaGuard } from './shared/guards/autentica.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AutenticaGuard]},
  {path: 'registro', loadChildren: () => import('./modules/registros/registros.module').then(m => m.RegistrosModule)},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PaginaerrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
