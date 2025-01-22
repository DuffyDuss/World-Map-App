/*
import { CountryDetailsComponent } from './country-details/country-details.component';
import { ConvertPipe } ;
import { convertToParamMap } from '@angular/router';
*/

import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';


export const routes: Routes = [
    {
        path: '',
        component: MapComponent
    }
];
