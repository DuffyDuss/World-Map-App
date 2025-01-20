import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from "./map/map.component";
import { CountryDetailsComponent } from "./country-details/country-details.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MapComponent, CountryDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'd280_app';
}
