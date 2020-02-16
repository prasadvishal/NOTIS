import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class SummaryService {
	constructor(private http: HttpClient) { }
	//API_URL = environment.apiUrl;
	API_URL = "http://10.201.0.11:3035/";
  	//check for user login
  	getTradeData(requestObj) {
    	return this.http.post(`${this.API_URL}getTradeData`, requestObj);
  	}
  	getFiltersMetadata(requestObj) {
    	return this.http.get(`${this.API_URL}filters/metadata?token=${requestObj.token}&marketType=${requestObj.marketType}`);
  	}
}
