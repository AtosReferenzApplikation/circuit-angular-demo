import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {CircuitService, CustomerService, SAMPLE_CUSTOMERS} from '../shared';
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
  customersToShow: Customer[]; // contains all customers which should be shown
  avatarUrl = '';
  href: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private circuitService: CircuitService,
    private router: Router
  ) {}

  ngOnInit() {
    this.customersToShow = [];
    this.activatedRoute.params.subscribe(params => {

      this.customerService.getCustomerById(params.id1).subscribe(val => {
        if(val) {
        this.customersToShow[0] = val;
          this.getAvatarOfCustomer(this.customersToShow[0]);
        }
      });

      this.customerService.getCustomerById(params.id2).subscribe(val => {
        if(val) {
        this.customersToShow[1] = val;
          this.getAvatarOfCustomer(this.customersToShow[1]);
        }
      });

      this.customerService.getCustomerById(params.id3).subscribe(val => {
        if(val) {
        this.customersToShow[2] = val;
          this.getAvatarOfCustomer(this.customersToShow[2]);
        }
      });

      this.customerService.getCustomerById(params.id4).subscribe(val => {
        if(val) {
        this.customersToShow[3] = val;
          this.getAvatarOfCustomer(this.customersToShow[3]);
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

  viewMoreCustomers() {                                 // Hubert ID
    this.router.navigate([this.router.url + '/72f17761-1ad0-460b-85ba-a21dace1d9cf']);

  }
}
