import { Component, OnInit } from '@angular/core';
import { WebsocketService} from '../shared/services/websocket/websocket.service';
import { Supporter } from '../models/supporter';
import { SupportRequest } from '../models/supportRequest';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  request: SupportRequest = {subject: '', description: ''};
  supporter: Supporter = {email: ''};

  constructor(private websocket: WebsocketService) { }

  ngOnInit() {
    this.websocket.onMessage('/topic/requestSupporter').subscribe( res => this.request = JSON.parse(res));
  }

  acceptSupportRequest() {
    this.supporter.email = 'Frank.Rot86@mailinator.com';  // TODO get mail of current  user
    this.websocket.send('/app/set/supporter', this.supporter);
  }

}
