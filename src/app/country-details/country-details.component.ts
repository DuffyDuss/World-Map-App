import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class CountryDetailsComponent implements OnChanges {
  countryData: Country[] = [];
  @Input() selectedCountry: string = '';

  constructor(private worldBankService: WorldBankService) {}

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['selectedCountry'] && this.selectedCountry) {
        this.worldBankService.getCountryByCode(this.selectedCountry).subscribe({
          next: (response: any) => {
            if (response[1] && response[1].length > 0) {
              this.countryData = response[1].map((country: any) => ({
                name: country.name || 'N/A',
                capital: country.capitalCity || "N/A",
                region: country.region.value || "N/A",
                incomeLevel: country.incomeLevel.value || "N/A",
                latitude: parseFloat(country.latitude) || "N/A",
                longitude: parseFloat(country.longitude) || "N/A"
            }));
            //console.log('Updated country data:', this.countryData);
          } else {
            this.countryData = [];
            //console.log('No data found for country:', this.selectedCountry);
          }
        },

        error: (error) => {
          console.log('Error:', error);
          this.countryData = [];
        }
      });
    }
  }
}
  