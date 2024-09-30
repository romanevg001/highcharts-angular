import { Injectable } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';
import { from, map, takeUntil } from 'rxjs';
import { IWeatherData } from '../weather/weather.model';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private range(start: number, stop: number, step: number) {
    return Array.from(
      { length: (stop - start) / step },
      (_, i) => start + i * step
    );
  }

  weatherData(data: IWeatherData) {
    const hourly = Object.entries(data.hourly as any).reduce(
      (res, [key, value]) => {
        if (value) {
          res.push(key);
        }
        return res;
      },
      [] as string[]
    );
    console.log()
    return from(
      fetchWeatherApi('https://api.open-meteo.com/v1/forecast', {
        latitude: data.location?.latitude,
        longitude: data.location?.longitude,
        start_date: moment(data.start_date)?.format('YYYY-MM-DD'),
        end_date: moment(data.end_date)?.format('YYYY-MM-DD'),
        hourly,
        /*  latitude: 52.52,
        longitude: 13.41,
        hourly: [
          'temperature_2m',
          'relative_humidity_2m',
          'precipitation_probability',
          'surface_pressure',
          'shortwave_radiation',
        ],
        start_date: '2024-09-05',
        end_date: '2024-10-01', */
        models: 'icon_seamless',
      })
    ).pipe(
      map((el) => el[0]),
      map((el) => ({
        utcOffsetSeconds: el.utcOffsetSeconds(),
        timezone: el.timezone(),
        timezoneAbbreviation: el.timezoneAbbreviation(),
        latitude: el.latitude(),
        longitude: el.longitude(),
        resHourly: el.hourly()!,
      })),
      map(({ resHourly, utcOffsetSeconds }) => ({
        time: this.range(
          Number(resHourly.time()),
          Number(resHourly.timeEnd()),
          resHourly.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),

        charts: hourly.reduce((res, h, i) => {
          res = {
            ...res,
            [h]: resHourly.variables(i)!.valuesArray()!
          }
          return res;
        },{})
      }))
    );
  }
}
