import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, retry} from  'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';

//const API_URL = 'http://localhost:8080/api/test/';
const API_URL = 'http://localhost:8080/api/teachers/';

const  baseUrl2="http://localhost:8080/api/user/allUsers";



@Injectable({
  providedIn: 'root'
})
export class UserService {
 baseUrl = "http://localhost:8080/api/user";
  API_URL = 'http://localhost:8080/api/teachers/';



  constructor(private http: HttpClient) {}



  private handleError(error:HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('An error occured:', error.error.message);

      }else{
        console.error(
          `Backend returned code ${error.status}, ` + `body was: ${error.error}`
        )
      };
      return throwError(
        'Something bad happened. Try again.'
      );
  };

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }


   retrieveAllUsers():Observable<any> {
    return this.http.get(baseUrl2);



  }
  //find one user by username
  findUserByName(firstName):Observable<any>{
    return this.http.get(`${baseUrl2}?firstName=${firstName}`)

  }
  // update user profile
  update(id, data): Observable<any> {
    return this.http.put(`${API_URL}`+ 'user', data);

  }
  loadData(userId){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return userId;
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.API_URL}` + 'user', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }



}
