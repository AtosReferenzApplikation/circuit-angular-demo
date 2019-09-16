import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../models/customer';
@Component({
  selector: 'app-customer-chat',
  templateUrl: './customer-chat.component.html',
  styleUrls: ['./customer-chat.component.scss']
})
export class CustomerChatComponent implements OnInit {

  @Input() customer1: any;

  constructor(
  ) { }

  ngOnInit() {
  }

}
