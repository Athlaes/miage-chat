import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { materialModule } from '../../shared/modules/material.module';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';
import { DatabaseService } from '../../shared/service/database.service';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [materialModule],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css',
})
export class DiscussionComponent implements OnInit, OnChanges {
  @Input() channel: any = {};
  user = this.auth.getUser();
  messages: any[] = [];
  openedWs: WebSocket | undefined;

  constructor(private databaseService : DatabaseService, private auth: AuthService) {}

  sendMessageWs(message: string): void {
    this.openedWs?.send(message);
  }

  ngOnInit(): void {
    this.wsConnect();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.channel = changes['channel'].currentValue;
    if (this.channel) {
      this.wsConnect();
    }
  }

  wsConnect(): void {
    if (this.channel) {
      this.openedWs?.close();

      const ws = new WebSocket(`ws://${this.databaseService.getBaseUrl()}/ws/messages/${this.channel.name}`);

      ws.onopen = (event) => {
        console.log('connection event : ', event);

        ws.onmessage = (e) => {
          if(e.data) {
            let data = JSON.parse(e.data)
            console.log("received : ", data)
            if(Array.isArray(data)) {
              this.messages = data
            } else {
              this.messages.push(data)
            }
          }
        };

        ws.onerror = (e) => {
          console.log(e);
        };
      };

      this.openedWs = ws;
    }
  }

  sendMessage(f: NgForm) {
    if (f.valid) {
      const message: any = {
        text: f.value.text,
        user: {
          id: this.user?.id,
        },
        channel: {
          id: this.channel?.id,
        },
      };
      try {
        this.openedWs?.send(JSON.stringify(message));
        f.reset();
      } catch (error) {
        console.log(error);
      }
    }
  }
}
