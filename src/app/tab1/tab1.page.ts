import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import * as Papa from 'papaparse';
import firebase from 'firebase/compat/app';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  carShowForm: FormGroup;
  fileData: any;
  fileName: string;
  currentDate = new Date();
  passwordEntered = false;

  
  
 
  constructor(private firestore: AngularFirestore, private fb: FormBuilder,private storage: AngularFireStorage, ) {
    this.carShowForm = this.fb.group({
      dates: ['', Validators.required],
      endDate: [''],
      cityState: ['', Validators.required],
      title: ['', Validators.required],
      address: [''],
      cost: [''],
      webaddress: [''],
      contact: [''],
      prizes: [''],
      details: ['', Validators.required],
      flyer: [''],
      register: [''],
      image: [''],
      featured: [false],
      soldOut: [false],
      benefit: ['']
    });

    

    
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const day = ("0" + currentDate.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }

  addCarShow() {
    if (this.carShowForm.valid) {
      const carShow = this.carShowForm.value;
      this.firestore.collection('carShowFinal').valueChanges().pipe(take(1)).subscribe((data: any[]) => {
        const sortedData = data.sort((a, b) => new Date(a.dates).getTime() - new Date(b.dates).getTime());
        const indexToInsert = sortedData.findIndex(item => new Date(item.dates).getTime() > new Date(carShow.dates).getTime());
        if (indexToInsert === -1) {
          const lastItem = sortedData[sortedData.length - 1];
          const idToInsertBefore = lastItem ? lastItem.id : null;
          const dataToInsert = { ...carShow };
          delete dataToInsert.id;
          this.firestore.collection('carShowFinal').doc(idToInsertBefore).collection('dummy').add({}).then((docRef) => {
            this.firestore.collection('carShowFinal').doc(docRef.id).set(dataToInsert)
              .then(() => {
                console.log('Car show added successfully');
                this.carShowForm.reset();
              })
              .catch(error => console.error(error));
          });
        } else {
          const idToInsertBefore = indexToInsert > 0 ? sortedData[indexToInsert - 1].id : null;
          const dataToInsert = { ...carShow };
          delete dataToInsert.id;
          this.firestore.collection('carShowFinal').doc(idToInsertBefore).collection('dummy').add({}).then((docRef) => {
            this.firestore.collection('carShowFinal').doc(docRef.id).set(dataToInsert)
              .then(() => {
                console.log('Car show added successfully');
                this.carShowForm.reset();
              })
              .catch(error => console.error(error));
          });
        }
      });
    }
  }
  
  handleFileInput(files: FileList) {
    const file = files.item(0);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const csvData = reader.result;
      this.fileData = Papa.parse(csvData.toString(), {
        header: true,
        transform: (value, header) => {
          if (header === "soldOut" || header === "featured") {
            return value === "true";
          }
          return value;
        }
      }).data;
      this.fileName = file.name;
    };
  }

  
  
uploadData() {
    // Prompt the user for a password
    var password = prompt("Please enter the password to upload data:");
  
    // Check if the password is correct
    if (password === "OldCars1960") { // Replace "mypassword" with the actual password
      console.log("Password accepted.");
      // Upload the data here
      const db = firebase.firestore();
      this.fileData.forEach((carShow) => {
        db.collection('carShowFinal').add(carShow)
          .then(() => console.log(`Document successfully written: ${carShow.id}`))
          .catch((error) => console.error(`Error writing document: ${error}`));
      });
    } else {
      alert("Incorrect password!");
    }
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    const filePath = `car-show-images/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          // do something with the URL, like save it in the database
          console.log('File available at', url);
        });
      })
    ).subscribe();
  }

 
  
}