import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  Customers:any = [];

  constructor(
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(res => {
      console.log(res);
      this.Customers = res;
    });
  }

  // send data to the frontend
  dataSource = this.Customers;

}
