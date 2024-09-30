import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { WeatherData, IWeatherData } from '../weather.model';

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'weather', resettable: true })
export class WeatherStore extends Store<IWeatherData> {
  constructor() {
    super(new WeatherData());
  }
}
