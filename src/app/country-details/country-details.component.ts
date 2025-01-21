import { Component, OnInit } from '@angular/core';
//import { MapComponent } from '../map/map.component';
//import { MapService } from '../services/map.service';
import { WorldBankService } from '../services/world-bank.service';
import { Country } from '../models/country';

@Component({
  selector: 'app-country-details',
  imports: [],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
  standalone: true
})
export class CountryDetailsComponent implements OnInit {
  countryData: Country[] = [];

  constructor(private worldBankService: WorldBankService) {}

  ngOnInit(): void {
    this.worldBankService.loadWorldBank().subscribe({
      next: (response: any) => {
        //console.log('All countries:', data);
        this.countryData = this.worldBankService.mapWorldBankData(response);
        console.log('Mapped data:', this.countryData);
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });

    /* this.worldBankService.getCountryByCode('US').subscribe({
      next: (data) => {
        console.log('Single country:', data);
      },

      error: (error) => {
        console.log('Error:', error);
      }
    }); */
  }
}
