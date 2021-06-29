import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {BuyerService} from '../../service/buyer.service';

@Component({
  selector: 'app-buyer-list',
  templateUrl: './buyer-list.component.html',
  styleUrls: ['./buyer-list.component.css']
})
export class BuyerListComponent implements OnInit {

  Buyers:any = [];

  constructor(
    private buyerService: BuyerService,
    private router: Router) { }

  ngOnInit(): void {
    this.buyerService.getBuyers().subscribe(res => {
      console.log(res);
      this.Buyers = res;
    });
  }

  delete(id:any, i:any){
    console.log(id);
    if(window.confirm('Do you want to continue?')) {
      this.buyerService.deleteBuyer(id).subscribe((res) => {
        this.Buyers.splice(i, 1);
      });
    }
  }

  addBuyer(): void {
    this.router.navigateByUrl('add-buyer');
  }

  dataSource = this.Buyers;

}
