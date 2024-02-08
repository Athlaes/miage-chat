import { Component } from '@angular/core';
import { materialModule } from '../../shared/modules/material.module';
import { SalonsComponent } from '../../components/salons/salons.component';
import { DiscussionComponent } from './../../components/discussion/discussion.component';
import { ParticipantsComponent } from '../../components/participants/participants.component';
import { Salon } from '../../shared/interfaces/Salon';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'app-messagerie',
  standalone: true,
  imports: [materialModule, SalonsComponent, DiscussionComponent, ParticipantsComponent],
  templateUrl: './messagerie.component.html',
  styleUrl: './messagerie.component.css'
})
export class MessagerieComponent {
  protected channel: Salon | undefined
  protected user: User = {
    id: "68d23e60-92bc-11ee-aa3f-35a0a7573b97",
    firstName: "bilal",
    lastName: "darouich",
    email: "bilal@test.com",
    pwdHash: "1234",
    channelId: "c5986660-9375-11ee-877f-7d2c727f5f02",
    createdAt: "2023-12-05T13:54:13.064Z",
    updatedAt: "2023-12-05T13:54:13.064Z"
  }

  setChannel(channel: Salon) {
    this.channel = channel;
  }
}
