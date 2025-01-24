import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CountryDetailsComponent } from "../country-details/country-details.component";
import { MapService } from '../services/map.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-map',
  imports: [
    CountryDetailsComponent,
    CommonModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  standalone: true
})
export class MapComponent implements OnInit{
  svgContent: SafeHtml |undefined;
  @Output()countrySelected = new EventEmitter<string>();
  selectedCountryId: string = '';

  constructor(
    private mapService: MapService,
    private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    
    this.mapService.loadSvgMap().subscribe({
      next: (svgContent) => {
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svgContent);
        console.log('SVG paths:', this.sanitizer.bypassSecurityTrustHtml(svgContent));
      setTimeout(() => this.svgInteractions(), 100);
      },
      error: (error) => {
        console.error('Error loading SVG:', error);
      },
      complete: () => {
        console.log('Completed');
      }
    });
  }

  private svgInteractions(): void {
    const svg = document.querySelector('.map-column svg');
    if (svg){
      const paths = svg.querySelectorAll('path');
  
    paths.forEach(path => {
      path.addEventListener('mouseover', () => {
        path.setAttribute('style', 'fill: #c5a572');
        const countryId = path.getAttribute('id');
        this.selectedCountryId = countryId || '';
      });

      path.addEventListener('mouseleave', () => {
        path.setAttribute('style', '');
      });
    });
    }
  }
}
