import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';


interface CarShow {
  id: number;
  dates: string;
  endDate: string;
  cityState: string;
  title: string;
  address: string;
  cost: string;
  webaddress: string;
  contact: string;
  prizes: string;
  details: string;
  flyer: string;
  register: string;
  image: string;
  featured: boolean;
  soldOut: boolean;
  benefit: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  searchTerm: string;
  currentDate = new Date();
  carShowFinal$: Observable<CarShow[]>;

  constructor( private firestore: AngularFirestore, private fb: FormBuilder, private storage: AngularFireStorage) {}

  ngOnInit() {
    this.carShowFinal$ = this.firestore
      .collection('carShowFinal', ref => ref.orderBy('dates', 'asc'))
      .snapshotChanges()
      .pipe(
        map((actions: DocumentChangeAction<CarShow>[]) => {
          return actions.map((a: DocumentChangeAction<CarShow>) => {
            const data = a.payload.doc.data() as CarShow;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    
    this.carShowFinal$.subscribe(data => console.log(data));
  }

/*
  uploadData() {
    const data = [
      {
        "id": 4,
        "dates": "5/5/2023",
        "endDate": "5/7/2023",
        "cityState": "Lake of the Ozarks, MO",
        "title": "35th Annual Magic Dragon Street Meet Nationals",
        "address": "",
        "cost": "",
        "webaddress": "http://www.magicdragoncarshow.com",
        "contact": "573-964-1008.",
        "prizes": "",
        "details": "Open to all makes, models and years of cars, trucks and motorcycles. The strip is closed to normal traffic during show hours Saturday.",
        "flyer": "",
        "register": "",
        "image": "",
        "featured": false,
        "soldOut": true,
        "benefit": ""
      },
    ];

    // Loop through the data and add each object as a new document in the collection
    data.forEach((carShow: any) => {
      // Convert 'featured' and 'soldOut' properties to boolean before adding to Firestore
      carShow.featured = carShow.featured === true || carShow.featured === 'true';
      carShow.soldOut = carShow.soldOut === true || carShow.soldOut === 'true';
      this.firestore.collection('carShowFinal').add(carShow);
    });
  }*/
}
