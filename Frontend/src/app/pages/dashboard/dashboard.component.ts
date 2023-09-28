import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CitydataComponent } from '../citydata/citydata.component'; // Adjust the path as needed

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  isOpen: boolean = false;
  isModalOpen: boolean = false;
  weatherData: any;
  showalert: boolean = false
  cityname: string = '';


  name: string = '';
  temperature: number | null = null;
  Humidity: number | null = null;
  windspeed: number | null = null;
  min: number | null = null;
  max: number | null = null;
  country: string = '';


  private apiKey = '8620d226aa7170528e89de5cbd41a338';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient , private CitydataComponent: CitydataComponent) { }

  closedata() {
    this.weatherData = false
  }
  getWeather(cityname: string): Observable<any> {
    const params = { q: cityname, appid: this.apiKey };
    return this.http.get(this.apiUrl, { params });
  }
  searchcity() {
    if (this.cityname) {
      this.getWeather(this.cityname).subscribe(data => {
        this.weatherData = data;
        console.log('Input value captured:', this.weatherData);
      });
      this.cityname = ''
    }
    console.log('No City Found');


  }
  openModal() {
    this.isOpen = true;
    this.isModalOpen = true;
    console.log(this.isOpen)
  }
  closeModal() {
    this.isOpen = false;

    console.log(this.isOpen)
  }

  submitdata() {
    this.showalert = true
    this.isOpen = false;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const citydata = {
      "city": this.name,
      "country": this.country,
      "date": formattedDate,
      "temperature": this.temperature,
      "unit": "Celsius",
      "humidity": this.Humidity,
      "windspeed": this.windspeed,
      "conditions": "Partly Cloudy",
      "icon": "partly-cloudy",
      "visibility": 10,
      "forecast": {
        "temperature": {
          "min": this.min,
          "max": this.max,
          "unit": "Celsius"
        }
      },



    }
    //console.log('data', citydata);
    const apiUrl = 'http://localhost:3000/cities';

    this.http.post(apiUrl, citydata).subscribe(
      (response) => {
        console.log('API Response:', response);

        this.CitydataComponent.getData();

      },
      (error) => {
        console.error('API Error:', error);

      }
    );
    setTimeout(() => {
      this.showalert = false

    }, 2000)
  }

  kelvinToCelsius(kelvin: number): number {
    return Math.floor(kelvin - 273.15);
  }
}
