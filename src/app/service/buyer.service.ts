import { Injectable } from '@angular/core';
import { Buyer } from './buyer.model';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
}) 

export class BuyerService {

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

    // add buyer details to be stored directly into the database
    addBuyer(data:Buyer): Observable<any>{
        let api_url = `${this.REST_API}/add-buyer`;
        return this.httpClient.post(api_url, data)
                              .pipe(catchError(this.handleError))
    }

    // retrieve all buyers in the database
    getBuyers(){
        return this.httpClient.get(`${this.REST_API}/get-buyer`);
    }

    // retreive a single buyer object from the database
    getBuyer(id:any): Observable<any> {
        let api_url = `${this.REST_API}/get-buyer/${id}`;
        return this.httpClient.get(api_url, {headers: this.httpHeaders})
                              .pipe(map((res:any) => {
                                  return res || {}
                              }), catchError(this.handleError))
    }

    // update an existing buyer object inside the database
    updateBuyer(id:any, data:any): Observable<any>{
        let api_url = `${this.REST_API}/update-buyer/${id}`;
        return this.httpClient.put(api_url, data, {headers: this.httpHeaders})
                              .pipe(catchError(this.handleError))
    }

    // delete an existing buyer object inside of the buyer database
    deleteBuyer(id:any): Observable<any>{
        let api_url = `${this.REST_API}/delete-buyer/${id}`;
        return this.httpClient.delete(api_url, {headers: this.httpHeaders})
                              .pipe(catchError(this.handleError))
    }

}