import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';



import { CityService } from '../_services/city.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('input') inputRef: ElementRef


  cities: any;
  message = '';
  currentIndex = -1;
  title = '';

   public selectedCity: '';
  currentUser: any;
  //upload avatar picture
  selectedFiles: FileList;
  currentFile: File;

  imagePreview;
  image: File;
  fileInfos: Observable<any>;
  selectedStatus: string;

  constructor(private route: ActivatedRoute, private token: TokenStorageService, private userService: UserService, private cityService: CityService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveCities();
    // this.onchangeCity(this.selectedCity);
    this.currentUser = this.token.getUser();
    this.message = '';
  }
  saveUser(): void {
    const data = {
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      email: this.currentUser.email,
      description: this.currentUser.description,
      cityId: this.currentUser.city,
      imagePath: this.currentUser.imagePath,


    }

  }
  updatePublished(status): void {
    const data = {
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      email: this.currentUser.email,
      description: this.currentUser.description,
      cityId: this.currentUser.city,
      imagePath: this.currentUser.imagePath,
      imagePreview: this.currentUser.imagePreview,
      published: status
    };

    this.userService.update(this.currentUser.id, data)
      .subscribe(response => {
        this.currentUser.published = status;
        console.log(response);


      }, error => {
        console.log(error)
      });
  }

  onchangeCity(value) {

    this.selectedCity= value;
    //it will be string
    console.log(this.selectedCity);
  }
  updateUser(): void {
    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The info about user was successfully updated!';
        },
        error => {
          console.log(error);
          console.log(this.currentUser);
        }
      )
  }


  retrieveCities(): void {
    this.cityService.getAll()
      .subscribe(
        data => {
          this.cities = data;

           console.log(this.cities)
        },
        error => {
          console.log(error);
        }
      );
  }


  //upload picture
  onFileUpload(event: any): void {
    this.selectedFiles = event.target.files;
    const file = event.target.files[0]
    this.image = file;

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file)
  }

  upload(): void {


    this.currentFile = this.selectedFiles.item(0);
    this.userService.upload(this.currentFile).subscribe(
      data => {
        console.log('done');
      },

      err => {

        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
        console.log(err);
      });

  }



}
