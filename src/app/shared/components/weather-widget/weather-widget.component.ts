import {Component, Inject, OnInit} from '@angular/core';
import {Weather} from "../../../../types/models";
import {WeatherService} from "../../../core/services";


@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {
  public weather: Weather;
  public hasError = false;
  public weatherService: WeatherService;
  constructor(@Inject(WeatherService) service: WeatherService) {
    this.weatherService = service;
    this.getWeather();
  }

  async getWeather(): Promise<void> {

    const weatherData = await this.weatherService.getWeather();
    if (weatherData) {
      this.weather = await this.weatherService.getWeather() as Weather;
    }
    setInterval(() => {
      console.info('Weather data interval started');
      this.weatherService.getWeather().then(data => {
        if (weatherData) {
          this.weather = data as Weather;
        }
      });
    }, 600000);
  }

  ngOnInit(): void {
  }


}
