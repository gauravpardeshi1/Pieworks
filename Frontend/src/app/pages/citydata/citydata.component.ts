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

  page:number=1;

  ngOnInit(): void {
    this.http.get<any[]>(
      `http://localhost:3000/cities?_page=1&_limit=3`
    ).subscribe(
      (data) => {
      
        this.cities = data
      console.log('cities',this.cities)
     
      },
      (error) => {
        
        console.error('An error occurred:', error);
      

      }
    );
  }
  nextpage(){
    this.page++;
    console.log(this.page)
   }
 
   prevpage(){
     if(this.page>1){
       this.page--
       console.log(this.page)
 
     }
     
   }
}
