import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BuyerService } from '../../service/buyer.service';
import { FormGroup, FormBuilder } from "@angular/forms";
@Component({
  selector: 'app-add-buyer',
  templateUrl: './add-buyer.component.html',
  styleUrls: ['./add-buyer.component.css']
})
export class AddBuyerComponent implements OnInit {

  buyerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private buyerService: BuyerService
  ) { 
    this.buyerForm = this.formBuilder.group({
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

  onSubmit(): any {
    console.log(this.buyerForm.value);
    
    this.buyerService.addBuyer(this.buyerForm.value)
      .subscribe(() => {
        console.log("Data Added succesfully");
        this.ngZone.run(() => this.router.navigateByUrl("/buyer-list"))
      }, (err) => {
        console.log(err);
      });
  }

}
