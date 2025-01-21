import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { MapService } from '../services/map.service';
import { WorldBankService } from '../services/world-bank.service';

@Component({
  selector: 'app-country-details',
  imports: [
    MapComponent,
  ],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
  standalone: true
})
export class CountryDetailsComponent implements OnInit {

  constructor(private worldBankService: WorldBankService) {}

  ngOnInit(): void {
    this.worldBankService.loadWorldBank().subscribe({
      next: (data) => {
        console.log('All countries:', data);
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });

    this.worldBankService.getCountryByCode('US').subscribe({
      next: (data) => {
        console.log('Single country:', data);
      },

      error: (error) => {
        console.log('Error:', error);
      }
    });
  }
}
