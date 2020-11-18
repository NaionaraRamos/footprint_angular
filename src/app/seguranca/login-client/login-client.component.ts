import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from './../auth.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {

  public formLogin: FormGroup;
  public submitted: boolean = false;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router) { }


  ngOnInit(): void {
    this.startFormLogin();
  }

  login() {
    this.submitted = true;
    if (this.formLogin.invalid) {
      return;
    }

    const login = this.formLogin.value.loginEmail;
    const senha = this.formLogin.value.loginPassword;
    
    this.service.login(login, senha);
    //this.router.navigate(['/dashboard']);
  }

  public startFormLogin() {
    this.formLogin = this.fb.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: ['', Validators.required],
    }); 
  }
}