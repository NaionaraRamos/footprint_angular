import { AuthGuard } from './auth.guard';
import { environment } from './../../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginClientComponent } from './login-client/login-client.component';

@NgModule({
  declarations: [LoginClientComponent],
  imports: [
    CommonModule,
    SegurancaRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,       
  ],
  providers:[
    AuthGuard,
  ]
})
export class SegurancaModule { }
