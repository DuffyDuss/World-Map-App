import { Component, Input, OnInit } from '@angular/core';
//import { MapComponent } from '../map/map.component';
//import { MapService } from '../services/map.service';
import { WorldBankService } from '../services/world-bank.service';
import { Country } from '../models/country';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-details',
  imports: [CommonModule],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
  standalone: true
})
export class CountryDetailsComponent implements OnInit {
  countryData: Country[] = [];
  @Input() selectedCountry: string = '';

  constructor(private worldBankService: WorldBankService) {}

  ngOnInit(): void {
    this.worldBankService.loadWorldBank().subscribe({
      next: (response: any) => {
        this.countryData = response[1].map((country: any) => ({
          name: country.name || 'N/A',
          capital: country.capitalCity || "N/A",
          region: country.region.value || "N/A",
          incomeLevel: country.incomeLevel.value || "N/A",
          latitude: parseFloat(country.latitude) || "N/A",
          longitude: parseFloat(country.longitude) || "N/A"
        }));

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
