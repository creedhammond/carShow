import { Component } from '@angular/core';
import { pipe } from 'rxjs';
import sampleData from '../../assets/json/data.json';








@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page {

  searchTerm: string;

  constructor() {}
  Users: any = sampleData



  currentDate = new Date();

 

}
