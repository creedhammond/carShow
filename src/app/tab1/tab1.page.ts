import { Component } from '@angular/core';
import sampleData from '../../assets/json/data.json';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}
  Users: any = sampleData

  currentDate = new Date();

}
