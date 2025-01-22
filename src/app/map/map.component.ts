import { Component, OnInit } from '@angular/core';
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
    //console.log('SVG element', svg);
    if (svg){
      const paths = svg.querySelectorAll('path');
      //console.log('First path element', paths[0]);
  
    paths.forEach(path => {
      path.addEventListener('mouseover', () => {
        path.setAttribute('style', 'fill: #d62f8b');
        //console.log('Entered Country:', path.getAttribute('id'));
      });

      path.addEventListener('mouseleave', () => {
        path.setAttribute('style', '');
        //console.log('Left Country:', path.getAttribute('id'));
      });
    });
    }
  }
}
