import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { User } from '../../../../app/models/user.model.js';
import { UserService } from '../_services/user.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { createClassifier } from 'typescript';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('modal') modalRef: ElementRef
  closeResult: string;

  users:any;
  showUser: User;
  currentIndex = -1;
  imagePath: '';
  firstName: ''
  lastName:''
  username:'';
  id: String;


  constructor(private userService: UserService, private modalService: NgbModal) { }


  ngOnInit(): void {
    this.retrieveAllUsers();
  }
  retrieveAllUsers() {
    this.userService.retrieveAllUsers()
      .subscribe(
        data => {
          this.users = data;
          console.log(data);

        },
        error => {
          console.log(error);
        }
      )
  }
  searchByName():void{
    this.userService.findUserByName(this.firstName)
    .subscribe(
      data=> {
        this.users = data;
        // username is undefined
        console.log(this.firstName)
      },
      error=>{
        console.log(error)
      }
    )
  }


 //modal window to send email to user

open(content){
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

}

