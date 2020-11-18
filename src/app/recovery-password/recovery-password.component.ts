import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { ClientServiceService } from './../client-service.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {

  public formRecovery: FormGroup;
  public submitted: boolean = false;
  //client = {email: ''}

  constructor(
    private fb: FormBuilder,
    private router: Router,
   // private clientService: ClientServiceService
   ) { }

  ngOnInit(): void {
    this.iniciarFormRecovery();
  }

  recuperar() {
    this.submitted = true;
    if (this.formRecovery.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formRecovery.value));
    this.router.navigate(['/login']);

    let emailRecuperacao = this.formRecovery.get('recoveryEmail').value;
    console.log(emailRecuperacao);

   /*  this.client = {
       email: emailRecuperacao
     }; */

    /* this.clientService.toRecover(this.client).subscribe(() => {
      this.client = {
        email: emailRecuperacao
      }
    }) */
  }

  public iniciarFormRecovery() {
    this.formRecovery = this.fb.group({
      recoveryEmail: ['', [Validators.required, Validators.email]],
    });
  }
}