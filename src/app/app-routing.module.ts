import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUSComponent } from './about-us/about-us.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardClientComponent } from './dashboard-client/form/dashboard-client.component';
//import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { LoginClientComponent } from './seguranca/login-client/login-client.component';
import { RegisterClientComponent } from './register-client/form/register-client.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardClientComponent},
  //{path: 'dashboard-admin', component: DashboardAdminComponent},
  {path: 'login', component: LoginClientComponent},
  {path: 'register', component: RegisterClientComponent},
  {path: 'about', component: AboutUSComponent},
  {path: 'contact', component: ContactUsComponent},
  {path: 'recover', component: RecoveryPasswordComponent},
  {path: "**", component: PageNotFoundComponent}
] 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
