import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DatabaseService } from '../../shared/service/database.service';
import { User } from '../../shared/interfaces/user';
import { materialModule } from '../../shared/modules/material.module';

@Component({
  selector: 'app-participants',
  standalone: true,
  imports: [materialModule],
  templateUrl: './participants.component.html',
  styleUrl: './participants.component.css'
})

export class ParticipantsComponent implements OnInit, OnChanges {
  constructor(private service: DatabaseService) { };

  @Input() channel:any= {};
  public participants: User[] = [];

  ngOnInit(): void {
    if(this.channel){
      this.getAllParticipants();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.channel = changes['channel'].currentValue;
    if(this.channel){
      this.getAllParticipants();
    }
  }

  getAllParticipants() {
    this.service.getParticipants(this.channel?.id).subscribe({
      next : res => {
      this.participants = res;
      },
      error : err => console.log("impossible de charger les participants "+err)
    })
  }
}
