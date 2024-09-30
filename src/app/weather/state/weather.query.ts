import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { WeatherStore } from './weather.store';
import { IWeatherData } from '../weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherQuery extends Query<IWeatherData> {
  constructor(protected override store: WeatherStore) {
    super(store);
  }
}
