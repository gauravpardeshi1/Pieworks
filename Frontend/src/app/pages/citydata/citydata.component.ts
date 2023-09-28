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

  
  page: number=1;
  limit: number=3
  totalRecords: number = 0; 
  lastpage=0;
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
      
        this.lastpage = Math.ceil(data.length/3)
      })
  }
  
  nextpage(){
    this.page++;
    this.getData()

   }
 
   prevpage(){
     if(this.page>1){
      
       this.page--
       this.getData()

 
     }
     
   }

 
}
