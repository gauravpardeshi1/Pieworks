import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  isOpen: boolean = false;
  isModalOpen: boolean = false;

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
