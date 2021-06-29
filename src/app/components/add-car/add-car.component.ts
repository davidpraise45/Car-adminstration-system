import { Component, OnInit, NgZone} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {CarService} from '../../service/car.service';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  
  uniqueId: string = uuid();
  carForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private carService: CarService) {
      this.carForm = this.formBuilder.group({
        carId : [this.uniqueId],
        make  : [''],
        model : [''],
        year : [''],
        color : [''],
        price : ['']
      })
     }

  ngOnInit(): void { }

  onSubmit(): any{
    this.carService.addCar(this.carForm.value)
                   .subscribe(() => {
                      console.log("Data Added Succesfully");
                      this.ngZone.run(() => this.router.navigateByUrl('/car-list'))
                   }, (err) => {
                      console.log(err);
                   });
  }

}