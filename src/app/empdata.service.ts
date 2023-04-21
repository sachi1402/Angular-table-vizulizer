import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmpdataService {

  private employeListUrl = "https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==";
  
  constructor(private  http : HttpClient) { }

  getemployeList():Observable<any>{
    return  this.http.get(`${this.employeListUrl}`);
  }
}
