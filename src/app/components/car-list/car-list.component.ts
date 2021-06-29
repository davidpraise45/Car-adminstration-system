import { Component, OnInit } from '@angular/core';
import {CarService} from '../../service/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})

export class CarListComponent implements OnInit  {

  Cars:any = []; 
  constructor(
      private carService: CarService,
      private router: Router) { } 

  ngOnInit(): void {
      this.carService.getCars().subscribe(res => {
      console.log(res);
      this.Cars = res;
    }); 
  } 

  delete(id:any, i:any){
    console.log(id);
    if(window.confirm('Do you want to continue?')) {
      this.carService.deleteCar(id).subscribe((res) => {
        this.Cars.splice(i, 1);
      });
    }
  }
  
  addCar(): void {
    this.router.navigateByUrl('add-car');
  }

  // send data to the frontend
  dataSource = this.Cars;
}
