import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CustomerService {

    // define the direct api to the backend application (node.js)
    REST_API: string = 'http://localhost:13000/api';

    // define the http header
    httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private httpClient: HttpClient) { }

    // retreive all cutomers in the database
    getCustomers(){
        return this.httpClient.get(`${this.REST_API}/customer`);
    }
    
}