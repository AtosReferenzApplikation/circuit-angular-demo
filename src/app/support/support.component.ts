import { Component, OnInit } from '@angular/core';
import { WebsocketService} from '../shared/services/websocket/websocket.service';
import { Supporter } from '../models/supporter';
import { SupportRequest } from '../models/supportRequest';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  request: SupportRequest = {id: '', subject: '', description: ''};
  supporter: Supporter = {email: ''};

  public isAvailable = new BehaviorSubject(true);
  public available;

  private waitForRequest: Subscription;

  constructor(private websocket: WebsocketService) { }

  ngOnInit() {
    this.isAvailable.subscribe(available => {
      this.available = available;
      if (available) {
        this.waitForRequest = this.websocket.onMessage('/topic/requestSupporter')
          .subscribe( res => this.request = JSON.parse(res));
      }
    });
  }

  acceptSupportRequest() {
    this.supporter.email = 'peter.meier99@gmx.de';  // TODO get mail of current  user
    this.websocket.send('/app/set/supporter/' + this.request.id, this.supporter);
    this.request = {id: '', subject: '', description: ''};
    // Unsubscribe Topic for receiving new Requests
    this.isAvailable.next(false);
    this.waitForRequest.unsubscribe();
  }

  closeSupportRequest() {
    this.available = true;
  }
}
