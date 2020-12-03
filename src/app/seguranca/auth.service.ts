import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthRepository } from './auth-repository';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtPayload: any;

  constructor(public repository: AuthRepository, private router: Router) { 
    this.carregarToken();
  }

  login(usuario: string, senha: string){
    
    return this.repository.post(usuario, senha).subscribe(resposta => {
        
        const json: JSON = JSON.parse(JSON.stringify(resposta));
        
        this.armazenarToken(json['data']['access_token']);
        
        this.router.navigate(['/dashboard']);
      },
        (e) => {
                
        });
  }

  private armazenarToken(token: string) {
    this.jwtPayload = JSON.parse(atob(token.split('.')[1]));
    
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  logout() {
    return this.repository.postLogout().subscribe(resposta => {
        this.limparAccessToken();
        this.router.navigate(['/login']);
      },
      (e) => {
   
      }); 
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token;
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  obterNovoAccessToken(){    
    return this.repository.postRefreshToken().subscribe(resposta => {
      const json: JSON = JSON.parse(JSON.stringify(resposta));
      this.armazenarToken(json['data']['access_token']);
   
     },
      (e) => {
    
      });  
  }
}