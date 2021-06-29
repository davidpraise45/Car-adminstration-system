import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyerService } from 'src/app/service/buyer.service';

@Component({
  selector: 'app-buyer-detail',
  templateUrl: './buyer-detail.component.html',
  styleUrls: ['./buyer-detail.component.css']
})
export class BuyerDetailComponent implements OnInit {

  getBuyerId: any;
  updateBuyerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private buyerService: BuyerService
  ) { 

    this.getBuyerId = this.activatedRoute.snapshot.paramMap.get("id");


    this.buyerService.getBuyer(this.getBuyerId).subscribe(res => {
        this.updateBuyerForm.setValue({
          firstname: res['firstname'],
          lastname: res['lastname'],
          personId: res['personId'],
          occupation: res['occupation'],
          houseaddress: res['houseaddress'],
          phonenumber: res['phonenumber'],
          carId: res['carId']
        });
    });

    this.updateBuyerForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      personId: [''],
      occupation: [''],
      houseaddress: [''],
      phonenumber: [''],
      carId: ['']
    })
  }

  ngOnInit(): void {}

  onUpdate(): any {
    this.buyerService.updateBuyer(this.getBuyerId, this.updateBuyerForm.value)
      .subscribe(() => {
        console.log("Data Updated succesfully");
        this.ngZone.run(() => this.router.navigateByUrl("/buyer-list"))
      }, (err) => {
        console.log(err);
      });
  }

}
