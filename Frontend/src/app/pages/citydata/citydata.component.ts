import { Component, Injectable } from '@angular/core';
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
  showupdatealert: boolean = false
  loading:boolean=false
  page: number = 1;
  limit: number = 3
  totalRecords: number = 0;
  lastpage = 0;

  // Initialize totalRecords
  public getData() {
    this.loading=true
    this.http.get<any>(
      
      `https://successful-cod-lingerie.cyclic.cloud/cities?page=${this.page}`
    ).subscribe(
      (data) => {
        this.loading=false
        this.cities = data.weatherData

  console.log('data-b',data)

      },
      (error) => {

        console.error('An error occurred:', error);


      }
    );
  }

  ngOnInit() {
    this.getData();

    this.http.get<any>(
      `https://successful-cod-lingerie.cyclic.cloud/cities`
    ).subscribe(
      (data) => {

        this.lastpage = data.totalPages
        // console.log('lastpage', this.lastpage)
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
    // console.log(this.isOpen)
  }
  closeModal() {
    this.isOpen = false;

    console.log(this.isOpen)
  }
  updatecity(id: any) {
    // console.log('el', id)
    this.http.get<any>(
      `https://successful-cod-lingerie.cyclic.cloud/cities/${id}`
    ).subscribe(
      (data) => {

        this.citydata = data
        // console.log('singledata', this.citydata)
      })
  }
  callBothFunctions(id: any) {
    this.updatecity(id);
    this.openModal();
  }



  name: string = this.citydata.city
  humidity: number = this.citydata.humidity
  country: number = this.citydata.country
  temperature: number = this.citydata.temperature
  windspeed: number = this.citydata.windspeed
  min: number = this.citydata && this.citydata?.forecast?.temperature?.min
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
    // console.log('updated', data)
    this.http.patch(`https://successful-cod-lingerie.cyclic.cloud//cities/${id}`, data).subscribe(
      (response) => {
        // console.log('API Response:', response);
        this.getData()
        this.isOpen = false;
        this.showupdatealert = true

      },
      (error) => {
        console.error('API Error:', error);

      }

    );
    setTimeout(() => {
      this.showupdatealert = false

    }, 2000)
  }

}
