import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as _ from 'lodash';

const baseUrl = "http://localhost:8080/api/cities";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(baseUrl);
  }

  create(data):Observable<any>{
    return this.http.post(baseUrl, data);
  }

  findByCityName(title): Observable<any>{
    return this.http.get(`${baseUrl}?title=${title}`)
  }


  loadData(cityId){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return cityId;

  }
}
