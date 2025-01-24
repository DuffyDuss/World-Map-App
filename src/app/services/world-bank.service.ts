import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    //console.log('Getting country with code:', countryCode);
    return this.http.get(`https://api.worldbank.org/v2/country/${countryCode}?format=json&per_page=300`, {
      responseType: 'json'
    });
  } 
}
