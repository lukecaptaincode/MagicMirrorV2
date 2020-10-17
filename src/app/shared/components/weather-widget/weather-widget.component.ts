import {Component, OnInit} from '@angular/core';
import {AppConfig} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {
  public appName: string;
  private accuWeatherApiBase = 'http://dataservice.accuweather.com/locations/v1/cities/search'
  constructor(private http: HttpClient) {
    this.appName = '';
    console.log(this.GetWeather());
  }
  private GetWeather(){
    const requestUrl = this.accuWeatherApiBase + '?apikey=' + AppConfig.user.accuweather + '&q=' +AppConfig.user.city + '&language=en-IE&details=true HTTP/1.1'
    return this.http.get(requestUrl).subscribe(data => {
      return data;
    });
  }

  ngOnInit(): void {
  }

}
