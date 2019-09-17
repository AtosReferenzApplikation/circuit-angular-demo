import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {CircuitService, CustomerService, SAMPLE_CUSTOMERS} from '../shared';
import { Customer } from '../models/customer';
import 'rxjs/add/operator/filter';
import { isUndefined } from 'util';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  encapsulation: ViewEncapsulation.None // styling .nav-pills
})
export class CustomerComponent implements OnInit {
  customersToShow: Customer[]; // contains all customers which should be shown
  avatarUrl = '';
  allCustomers: Customer[] = SAMPLE_CUSTOMERS; // contains all customers which could be added
  id1: string; id2: string; id3: string; id4: string;

  faPlusCircle = faPlusCircle;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private circuitService: CircuitService,
    private router: Router
  ) {}

  ngOnInit() {
    this.customersToShow = [];
    this.activatedRoute.queryParams.subscribe(params => {/* console.log(params['ID1']); }); */

       this.customerService.getCustomerById(params['ID1']).subscribe(val => {
        if (val) {
        this.customersToShow[0] = val;
          this.getAvatarOfCustomer(this.customersToShow[0]);
        }
      });

      this.customerService.getCustomerById(params['ID2']).subscribe(val => {
        if (val) {
        this.customersToShow[1] = val;
          this.getAvatarOfCustomer(this.customersToShow[1]);
        }
      });

      this.customerService.getCustomerById(params['ID3']).subscribe(val => {
        if (val) {
        this.customersToShow[2] = val;
          this.getAvatarOfCustomer(this.customersToShow[2]);
        }
      });

      this.customerService.getCustomerById(params['ID4']).subscribe(val => {
        if (val) {
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

  addCustomers(customerID: string) {
    this.id1 = ''; this.id2 = ''; this.id3 = ''; this.id4 = '';
    this.activatedRoute.queryParams.subscribe(params => {
      this.id1 = params['ID1'];
      this.id2 = params['ID2'];
      this.id3 = params['ID3'];
      this.id4 = params['ID4'];
    });
    if (this.id1 === customerID || this.id2 === customerID || this.id3 === customerID || this.id4 === customerID) {
      return;
    }
    if (isUndefined(this.id4)) {
      this.router.navigate(['management/customer'], { queryParams: { ID1: this.id1, 'ID2': this.id2, 'ID3': this.id3,
      'ID4': customerID}});
      if (isUndefined(this.id3)) {
        this.router.navigate(['management/customer'], { queryParams: { ID1: this.id1, 'ID2': this.id2, 'ID3': customerID}});
        if (isUndefined(this.id2)) {
          this.router.navigate(['management/customer'], { queryParams: { ID1: this.id1, 'ID2': customerID } });
        }
      }
    }
  }

  sendCustomerToShow() {
    return this.customersToShow;
  }
}
