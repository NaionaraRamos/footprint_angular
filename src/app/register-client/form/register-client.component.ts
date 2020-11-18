import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../_helpers/must-match.validator';
import { UserRepository } from '../repository/user_repository';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css'],
})

export class RegisterClientComponent implements OnInit {
  
  public formRegister: FormGroup;
  public submitted: boolean = false;
  scredules = []
  operation = true
  client = {
    id: null, 
    name: '', surname: '', mail: '', password: '' };
  
  ngOnInit(): void {
    this.startForm();
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private repositorio: UserRepository,
    ) { }

  public startForm() {

    this.formRegister = this.fb.group({

      id: [null],
      inputName: ['', Validators.required],
      inputSurname: ['', Validators.required],
      inputEmail: ['', [Validators.required, Validators.email]],
      inputPassword: ['', Validators.required],
      inputConfirm: ['', Validators.required]
    }, {

        validator: MustMatch('inputPassword', 'inputConfirm')
    });
  }

  registerClient(formRegister){
    this.client = {
      id: this.formRegister.value.id, 
      //id: 80,
      name: this.formRegister.value.inputName,
      surname: this.formRegister.value.inputSurname,
      mail: this.formRegister.value.inputEmail,
      password: this.formRegister.value.inputPassword
    } 

    console.log(this.client.id);
    console.log(this.client.name);
    console.log(this.client.surname);
    console.log(this.client.mail);
    console.log(this.client.password);

    this.repositorio.postUser(this.client).subscribe(resposta => {
      console.log("Resposta: " + resposta);
      
      this.client = {
        id: null, name: '', surname: '', mail: '', password: '' };
        this.router.navigateByUrl('/login')
    })
  }
}