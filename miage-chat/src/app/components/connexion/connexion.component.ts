import { Component } from '@angular/core';
import { materialModule } from '../../shared/modules/material.module';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [materialModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  constructor(private authservice : AuthService){};
  onSubmit(f: NgForm) {
    if(f.valid){
      console.log(f.value.email);
      console.log(f.value.password);
      this.authservice.login(f.value.email,f.value.password);
    }
  }

}
