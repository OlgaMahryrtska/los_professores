import { Component, OnInit } from '@angular/core';
import { CityService } from '../_services/city.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css']
})
export class CitiesListComponent implements OnInit {
  cities: any;
  currentIndex = -1;
  title='';


  constructor(private cityService: CityService,  public sanitizer: DomSanitizer) { }
  //  public getSanitizerUrl(url:string){
  //   return this.sanitizer.bypassSecurityTrustUrl("D:/node_registration/client/src/assets/uploads/");
  // }

  ngOnInit(): void {
    this.retrieveCities();
  }
 retrieveCities(): void{
   this.cityService.getAll()
   .subscribe(
     data => {
       this.cities = data;
       console.log(data)
     },
     error=> {
       console.log(error);
     }
   );
 }

 searchTitle():void{
   this.cityService.findByCityName(this.title)
     .subscribe(
       data => {
         this.cities = data;

       },
       error =>{
         console.log(error)
       }
     )

 }


}
