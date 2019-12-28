import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	//API_URL = environment.apiUrl;
	API_URL = "http://10.201.0.11:3035/";
  	constructor(private http: HttpClient) { }
  	//check for user login
  	userLogin(loginObj) {
    	return this.http.post(`${this.API_URL}login`, loginObj);
  	}
}
