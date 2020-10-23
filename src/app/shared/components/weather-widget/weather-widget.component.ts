import {Component, OnInit} from '@angular/core';
import {AppConfig} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Weather} from "../../../../types/models";
import {shareReplay} from "rxjs/operators";
import * as moment from 'moment'

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {
  public weather: Weather;
  public hasError = false;

  constructor(private http: HttpClient) {
    this.getWeather().then(weather => this.weather = weather);
    setInterval(() => {
      console.info('Weather data interval started');
      this.getWeather().then(weather => this.weather = weather);
    }, 600000);
  }

  private async getWeather(): Promise<Weather | undefined> {
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
          reject(this.hasError = true);
        }
      });
    });
  }

  ngOnInit(): void {
  }


}
