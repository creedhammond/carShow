import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


interface CarShow {
  docId?: string; 
  dates: string;
  endDate?: string;
  cityState: string;
  title: string;
  address?: string;
  cost?: string;
  webaddress?: string;
  contact?: string;
  prizes?: string;
  details: string;
  flyer?: string;
  register?: string;
  image?: string;
  featured?: boolean;
  soldOut?: boolean;
  benefit?: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})


export class EditPage implements OnInit {
  carShows: CarShow[];
  selectedCarShow: CarShow;
  editForm: FormGroup;
  carShowFinal: Observable<CarShow[]>;
  

  constructor(private firestore: AngularFirestore, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.carShowFinal = this.firestore.collection<CarShow>('carShowFinal', ref => ref.orderBy('title', 'asc')).valueChanges();
    this.carShowFinal.subscribe(carShows => {
      this.carShows = carShows;
    });
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      dates: ['', Validators.required],
      cost: [''],
      endDate: [''],
      cityState: ['', Validators.required],
      address: [''],
      webaddress: [''],
      contact: [''],
      prizes: [''],
      details: ['', Validators.required],
      flyer: [''],
      register: [''],
      image: [''],
      featured: [''],
      soldOut: [''],
      benefit: [''],

    });
  }

  editCarShow(carShow: CarShow) {
    this.selectedCarShow = carShow;
    this.editForm.patchValue({
      title: carShow.title,
      cost: carShow.cost,
      endDate: carShow.endDate,
      dates: carShow.dates,
      cityState: carShow.cityState,
      address: carShow.address,
      webaddress: carShow.webaddress,
      contact: carShow.contact,
      prizes: carShow.prizes,
      details: carShow.details,
      flyer: carShow.flyer,
      register: carShow.register,
      image: carShow.image,
      featured: carShow.featured,
      soldOut: carShow.soldOut,
      benefit: carShow.benefit,
      
  
   

      
    });
  }

  saveChanges() {
    const updatedCarShow: CarShow = {

      dates: this.editForm.value.dates,
      endDate: this.selectedCarShow.endDate,
      cityState: this.editForm.value.cityState,
      title: this.selectedCarShow.title,
      address: this.selectedCarShow.address,
      cost: this.editForm.value.cost, // update the cost property with the form value
      webaddress: this.editForm.value.webaddress,
      contact: this.selectedCarShow.contact,
      prizes: this.selectedCarShow.prizes,
      details: this.selectedCarShow.details,
      flyer: this.selectedCarShow.flyer,
      register: this.selectedCarShow.register,
      image: this.selectedCarShow.image,
      featured: this.selectedCarShow.featured,
      soldOut: this.selectedCarShow.soldOut,
      benefit: this.selectedCarShow.benefit,
    };
    this.updateCarShow(updatedCarShow);
    this.selectedCarShow.title = this.editForm.value.title; // update the title property with the form value
    this.selectedCarShow.details = this.editForm.value.details; // update the title property with the form value
    this.selectedCarShow.dates = this.editForm.value.dates; // update the title property with the form value
    this.selectedCarShow.address = this.editForm.value.address; // update the title property with the form value
    this.selectedCarShow.cost = this.editForm.value.cost; // update the title property with the form value
    this.selectedCarShow.webaddress = this.editForm.value.webaddress; // update the title property with the form value
    this.selectedCarShow.contact= this.editForm.value.contact; // update the title property with the form value
    this.selectedCarShow.prizes= this.editForm.value.prizes; // update the title property with the form value
    this.selectedCarShow.flyer= this.editForm.value.flyer; // update the title property with the form value
    this.selectedCarShow.register= this.editForm.value.register; // update the title property with the form value
    this.selectedCarShow.featured= this.editForm.value.featured; // update the title property with the form value
    this.selectedCarShow.soldOut= this.editForm.value.soldOut; // update the title property with the form value
    this.selectedCarShow.benefit= this.editForm.value.benefit; // update the title property with the form value

    this.selectedCarShow = null;
    this.editForm.reset();
  }

  cancelChanges() {
    this.selectedCarShow = null;
    this.editForm.reset();
  }

  updateCarShow(carShow: CarShow) {
    this.firestore
      .collection('carShowFinal')
      .doc(carShow.docId)
      .update(carShow)
    .then(() => {
      console.log('Car show updated successfully!');
    })
    .catch((error) => {
      console.error('Error updating car show: ', error);
    });
}

deleteCarShow(carShow: CarShow) {
 

  this.firestore.collection('carShowFinal').doc(carShow.docId).delete()
    .then(() => {
      console.log('Car show deleted successfully');
    })
    .catch(error => {
      console.error('Error deleting car show:', error);
    });
}
}