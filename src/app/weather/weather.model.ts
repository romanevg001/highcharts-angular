import { Moment } from 'moment';

export interface IWeatherLocation {
  latitude: number;
  longitude: number;
  city: string;
}
export class WeatherLocation implements IWeatherLocation {
  latitude = 0;
  longitude = 0;
  city = '';
}

export interface IWeatherData {
  start_date: Moment | null | undefined;
  end_date: Moment | null | undefined;
  location: IWeatherLocation | null | undefined;
  hourly: any | undefined;
}

export class WeatherData implements IWeatherData {
  start_date = undefined;
  end_date = undefined;
  location = undefined;
  hourly = undefined;
}




export const weatherLocation: IWeatherLocation[] = [
    {
      latitude: 52.516363,
      longitude: 13.378906,
      city: 'Berlin',
    },
    {
      latitude: 55.755864,
      longitude: 37.617698,
      city: 'Moscow',
    },
    {
      latitude: 47.254342,
      longitude: 39.628128,
      city: 'Rostov-on-Don',
    },
  ];

export enum WeatherTypeInfoEnum {
    temperature_2m = 'Temperature',
    relative_humidity_2m = 'Relative humidity',
    precipitation_probability = 'Precipitation probability',
    surface_pressure = 'Surface pressure',
    shortwave_radiation = 'Shortwave radiation',
};
