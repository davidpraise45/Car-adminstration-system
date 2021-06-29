import { Injectable } from '@angular/core';
import { Car } from './car.model';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CarService {

    // define the direct api to the backend application (node.js)
    REST_API: string = 'http://localhost:13000/api';

    // define the http header
    httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private httpClient: HttpClient) { }

    // handle different erros on the client and server side of the application
    handleError(error: HttpErrorResponse){
        let error_message = "";
        if(error.error instanceof ErrorEvent){
            // handle error on the client side
            error_message = error.error.message; 
        }else{
            // handle error on the server side
            error_message = `Error code: ${error.status}\nMessage: ${error.message}`
        }
        console.log(error_message);
        return throwError(error_message)
    }

    // add car details to be stored directly into the database
    addCar(data:Car): Observable<any>{
        let api_url = `${this.REST_API}/add-car`;
        return this.httpClient.post(api_url, data)
                              .pipe(catchError(this.handleError))
    }

    // retreive all cars in the database
    getCars(){
        return this.httpClient.get(`${this.REST_API}/get-car`);
    }

    // retreive a single car object from the database
    getCar(id:any): Observable<any> {
        let api_url = `${this.REST_API}/get-car/${id}`;
        return this.httpClient.get(api_url, {headers: this.httpHeaders})
                              .pipe(map((res:any) => {
                                  return res || {}
                              }), catchError(this.handleError))
    }

    // update an existing car object inside the database
    updateCar(id:any, data:any): Observable<any>{
        let api_url = `${this.REST_API}/update-car/${id}`;
        return this.httpClient.put(api_url, data, {headers: this.httpHeaders})
                              .pipe(catchError(this.handleError))
    }

    // delete an existing car object inside of the car database
    deleteCar(id:any): Observable<any>{
        let api_url = `${this.REST_API}/delete-car/${id}`;
        return this.httpClient.delete(api_url, {headers: this.httpHeaders})
                              .pipe(catchError(this.handleError))
    }

}