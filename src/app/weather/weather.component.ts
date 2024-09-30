import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TopPanelComponent } from './top-panel/top-panel.component';
import { WeatherQuery } from './state/weather.query';
import { WeatherService } from '../services/weather.service';
import { map, switchMap } from 'rxjs';
import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [TopPanelComponent, KeyValuePipe,ChartComponent, AsyncPipe, MatGridListModule],
  templateUrl: './weather.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent {

    chartsData = this.weatherQuery.select().pipe(
        switchMap(weatherData => this.weatherService.weatherData(weatherData))
    );

    constructor(
        private weatherQuery: WeatherQuery,
        private weatherService: WeatherService,
    ) { }
}
