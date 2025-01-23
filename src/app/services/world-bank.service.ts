import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Country } from '../models/country';
@Injectable({
  providedIn: 'root'

})
export class WorldBankService {

  constructor(private http: HttpClient) { }
    
  public loadWorldBank() {
    return this.http.get('https://api.worldbank.org/v2/country/?format=json&per_page=300', {
      responseType: 'json' 
    });
  }

 public getCountryByCode(countryCode: string) {
    return this.http.get(`https://api.worldbank.org/v2/country/${countryCode}?format=json&per_page=300`, {
      responseType: 'json'
    });
  } 
}
