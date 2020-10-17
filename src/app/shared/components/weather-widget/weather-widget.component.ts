import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../../environments/environment';
@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {
  public appName: string;
  constructor() {
    this.appName = AppConfig.keys.appName;
  }

  ngOnInit(): void {
  }

}
