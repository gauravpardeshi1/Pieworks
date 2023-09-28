import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface City {
  city: string;
  temperature: number;
  humidity: number;

}

@Component({
  selector: 'app-citydata',
  templateUrl: './citydata.component.html',
  styleUrls: ['./citydata.component.css']
})
export class CitydataComponent {
  constructor(private http: HttpClient) { }
  cities: any[] = [];
  citydata: any = {};
  isOpen: boolean = false;
  isModalOpen: boolean = false;

  page: number = 1;
  limit: number = 3
  totalRecords: number = 0;
  lastpage = 0;

  // Initialize totalRecords
  getData() {
    this.http.get<any[]>(
      `http://localhost:8080/cities?_page=${this.page}&_limit=3`
    ).subscribe(
      (data) => {

        this.cities = data


      },
      (error) => {

        console.error('An error occurred:', error);


      }
    );
  }

  ngOnInit() {
    this.getData();

    this.http.get<any[]>(
      `http://localhost:8080/cities`
    ).subscribe(
      (data) => {

        this.lastpage = Math.ceil(data.length / 3)
      })
  }

  nextpage() {
    this.page++;
    this.getData()

  }

  prevpage() {
    if (this.page > 1) {

      this.page--
      this.getData()


    }

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
  updatecity(id: number) {
    console.log('el', id)
    this.http.get<any[]>(
      `http://localhost:8080/cities/${id}`
    ).subscribe(
      (data) => {

        this.citydata = data
        console.log('singledata', this.citydata)
      })
  }
  callBothFunctions(id: number) {
    this.updatecity(id);
    this.openModal();
  }


 
  name: string = this.citydata.city
  humidity: number = this.citydata.humidity
  country: number = this.citydata.country
  temperature: number = this.citydata.temperature
  windspeed: number = this.citydata.windspeed
  min: number = this.citydata?.forecast?.temperature?.min
  max: number = this.citydata?.forecast?.temperature?.max






  updatecitydata(id: number) {
    const data = {
      "city": this.name,
      "country": this.country,
      "temperature": this.temperature,
      "humidity": this.humidity,
      "windspeed": this.windspeed,
      "forecast": {
        "temperature": {
          "min": this.min,
          "max": this.max,
          "unit": "Celsius"
        },

      }
    }
    console.log('updated', data)
    this.http.patch(`http://localhost:8080/cities/${id}`, data).subscribe(
      (response) => {
        // console.log('API Response:', response);
        this.getData()
        this.isOpen = false;
         

      },
      (error) => {
        console.error('API Error:', error);

      }
    );
  }

}
