import {Injectable} from '@angular/core';
import {Weather} from "../../../../types/models";
import {AppConfig} from "../../../../environments/environment";
import {shareReplay} from "rxjs/operators";
import * as moment from "moment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  public async getWeather(): Promise<Weather | undefined | boolean> {
    console.info('Pulling weather data');
    return new Promise((resolve, reject) => {
      const locationQueryUrl
        = `https://api.weatherbit.io/v2.0/current?city=${AppConfig.user.city},&country=${AppConfig.user.country}&key=${AppConfig.user.weatherbit}`;
      this.http.get(locationQueryUrl).pipe(shareReplay(1, 1800000)).subscribe(data => {
        const weatherData = (data['data'][0] as Weather);
        weatherData.WeatherIconUrl = `./assets/weather-icons/${weatherData.weather.icon || 'a01d'}.png`;
        weatherData.convertedDateTime = moment(weatherData.ob_time).format('LLL');
        localStorage.setItem('weather', JSON.stringify(weatherData));
        resolve(weatherData);
      }, () => {
        if (JSON.parse(localStorage.getItem('weather')) as Weather) {
          resolve(JSON.parse(localStorage.getItem('weather')) as Weather);
        } else {
          reject(false);
        }
      });
    });
  }
}
