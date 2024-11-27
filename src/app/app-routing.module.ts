import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegisterComponent } from './component/register/register.component';
import { VarifyEmailComponent } from './component/varify-email/varify-email.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { AdminRequestComponentsComponent } from './component/admin-request-components/admin-request-components.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { CalculadoraComponent } from './component/calculadora/calculadora.component';

const routes: Routes = [
  {path: "", redirectTo:'login', pathMatch: 'full'},
  {path: "login", component : LoginComponent},
  {path: "dashboard", component : DashboardComponent, canActivate: [AuthGuard] },
  {path: "register", component : RegisterComponent},
  {path: "varify-email", component : VarifyEmailComponent},
  {path: "forgot-password", component : ForgotPasswordComponent},
  {path: "admin", component : AdminRequestComponentsComponent, canActivate: [AdminGuard] },
  {path: "calculadora", component : CalculadoraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
