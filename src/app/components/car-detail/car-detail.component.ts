import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/service/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  getCarId: any;
  updateCarForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private carService: CarService) {

      this.getCarId = this.activatedRoute.snapshot.paramMap.get('id');
      
      this.carService.getCar(this.getCarId).subscribe(res => {
          this.updateCarForm.setValue({
          make  : res['make'],
          model : res['model'],
          year : res['year'],
          color : res['color'],
          price : res['price']
        });
      });

      this.updateCarForm = this.formBuilder.group({
        make : [''],
        model : [''],
        year : [''],
        color : [''],
        price : ['']
      })
    }

  ngOnInit(): void { }

  onUpdate(): any{
    this.carService.updateCar(this.getCarId, this.updateCarForm.value)
                   .subscribe(() => {
                      console.log("Data Update Succesfully");
                      this.ngZone.run(() => this.router.navigateByUrl('/car-list'))
                   }, (err) => {
                      console.log(err);
                   });
  }

}
