import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  isOpen: boolean = false;
  isModalOpen: boolean = false;
  weatherData: any;
  cityname: string = '';
  private apiKey = '8620d226aa7170528e89de5cbd41a338';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  closedata(){
    this.weatherData=false
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

  

}
