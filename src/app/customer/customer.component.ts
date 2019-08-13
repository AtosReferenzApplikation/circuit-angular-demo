import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CircuitService, CustomerService } from '../shared';
import { Customer } from '../models/customer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  encapsulation: ViewEncapsulation.None // styling .nav-pills
})
export class CustomerComponent implements OnInit {
  customer1: Customer;
  customer2: Customer;
  customer3: Customer;
  customer4: Customer;
  avatarUrl = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private circuitService: CircuitService
  ) {}

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.customerService.getCustomerById(params.id1).subscribe(val => {
        this.customer1 = val;
        if(val) {
          this.getAvatarOfCustomer(this.customer1);
        }
      });

      this.customerService.getCustomerById(params.id2).subscribe(val => {
          this.customer2 = val;
        if(val) {
          this.getAvatarOfCustomer(this.customer2);
        }
      });

      this.customerService.getCustomerById(params.id3).subscribe(val => {
        this.customer3 = val;
        if(val) {
          this.getAvatarOfCustomer(this.customer3);
        }
      });

      this.customerService.getCustomerById(params.id4).subscribe(val => {
        this.customer4 = val;
        if(val) {
          this.getAvatarOfCustomer(this.customer4);
        }
      });

    });

  }

  getAvatarOfCustomer(customer: any) {
    this.circuitService
      .getUserById(customer.id)
      .then(user => {
        this.avatarUrl = user.avatar;
      })
      .catch(
        () => (this.avatarUrl = `https://ui-avatars.com/api/name=${customer.name}+${customer.surname}`)
      );
  }
}
