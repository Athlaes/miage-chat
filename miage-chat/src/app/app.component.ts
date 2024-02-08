import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from './shared/service/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [FormsModule, CommonModule, RouterOutlet, MatToolbarModule,
    MatButtonModule, ReactiveFormsModule, RouterLink, RouterLinkActive]
})
export class AppComponent {
  constructor(private auth: AuthService) { };
  title = 'miage-chat';
  user = this.auth.getUser();
  logOut(){
    this.auth.logOut();
  }
}
