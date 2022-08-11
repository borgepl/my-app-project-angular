import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-alert',
  templateUrl: './info-alert.component.html',
  //styleUrls: ['./info-alert.component.css']
  styles: [` h3 {
    color: blue
  }`]
})
export class InfoAlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
