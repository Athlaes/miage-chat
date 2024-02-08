import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { materialModule } from '../../shared/modules/material.module';
import { DatabaseService } from '../../shared/service/database.service';
import { Salon } from '../../shared/interfaces/Salon';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';

@Component({
  selector: 'app-salons',
  standalone: true,
  imports: [materialModule],
  templateUrl: './salons.component.html',
  styleUrl: './salons.component.css'
})
export class SalonsComponent implements OnInit {
  constructor(private service: DatabaseService, private auth: AuthService) { }
  @Input() channel: any;
  @Output() valueChange = new EventEmitter();
  public salons: any[] = [];
  private oldSelection : any

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getSalons().subscribe({
      next: (res: any) => {
        if (res) {
          this.salons = res;
        }
      },
      error: err => console.error('Impossible de charger les salons: ' + err),
    });
  }

  async setChannel(channel: any) {
    if (this.oldSelection) {
      this.oldSelection.selected = false
    }
    channel.selected = true
    this.channel = channel
    this.oldSelection = this.channel
    await this.updateUser();
  }
  createChannel(f: NgForm) {
    if (f.valid) {
      const channel = {
        name: f.value.name,
        adminId: this.auth.getUser().id,
      }
      this.service.createChannel(channel).subscribe({
        next: res => {
          f.reset();
          this.getAll();
        },
        error: err => console.log("impossible de créer un nouveau channel " + err)
      })
    }
  }

  async updateUser() {
    const user = this.auth.getUser();
    user.channelId = this.channel?.id;
    this.service.updateUser(user).subscribe({
      next: res => {
        this.valueChange.emit(this.channel)
      },
      error: err => {
        console.log(err);
        this.valueChange.emit(this.channel)
      },
    });
  }
}
