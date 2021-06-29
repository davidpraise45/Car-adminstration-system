import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarListComponent } from './components/car-list/car-list.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

import { AddBuyerComponent } from './components/add-buyer/add-buyer.component';
import { BuyerListComponent } from './components/buyer-list/buyer-list.component';
import { BuyerDetailComponent } from './components/buyer-detail/buyer-detail.component';

import {CustomerComponent} from './components/customer/customer.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'customer' },
  { path: 'buyer-list', component: BuyerListComponent },
  { path: 'add-buyer', component: AddBuyerComponent },
  { path: 'edit-buyer/:id', component: BuyerDetailComponent },

  { path: 'car-list', component: CarListComponent },
  { path: 'add-car', component: AddCarComponent },
  { path: 'edit-car/:id', component: CarDetailComponent },

  { path: 'customer', component: CustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
