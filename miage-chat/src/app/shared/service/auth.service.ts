import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private service: DatabaseService, private router : Router) {}

  isLogin(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
  getUser(): any {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
  }
  login(email: string, password: string) {
    const login = {
      email: email,
      password: password,
    };
    this.service.login(login).subscribe({
      next: (res) => {
        localStorage.setItem('currentUser', JSON.stringify(res));
        this.router.navigateByUrl('/messagerie');
      },
      error: (err) => {
        console.log('impossible de se connecter ' + err.error);
        if (err.status == 400) {
          alert(err.error);
        }
      },
    });
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }

  canActivate() {
    
  }
}
