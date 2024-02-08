import { Component, inject } from '@angular/core';
import { materialModule } from '../../shared/modules/material.module';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../../shared/service/database.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [materialModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css',
})
export class InscriptionComponent {
  constructor(private databaseService: DatabaseService) { }
  private router = inject(Router);
  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
    const user = {
      firstName: f.value.first,
      lastName: f.value.last,
      email: f.value.email,
      password: f.value.password,
      channelId:null
    }
    if (f.valid) {
      this.databaseService.register(user).subscribe({
        next: (res : any) => {
          if (res) {
            f.reset();
            alert("inscription réussie");
            this.router.navigateByUrl('/login');
          }
        }
      });
    }
  }
}
