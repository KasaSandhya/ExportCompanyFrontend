import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { commonHeaders } from "./common.headers";
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseUrl= "http://localhost:3000/"

  constructor(private http: HttpClient,private router: Router) { }

  getOrdersInfo(id: any) {
        console.log("in the service method ", id)
          return this.http.get(this.baseUrl + `order/${id}` + '-distributor-product-name',{
        headers: commonHeaders,
      })
      .pipe(
        map((data) => {
          console.log("data", data);
          return data;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err, "ERERER>>>>>>>>>>>>>>>>>");
          return err;
        })
      );
  }

  login(username: any, password:any) {
    console.log("in the service method ", username)
      return this.http.get(this.baseUrl + `users/${username}/${password}`,{
    headers: commonHeaders,
  })
  .pipe(
    map((data) => {
      console.log("data", data);
      return data;
    })
  )
  .pipe(
    catchError((err) => {
      console.log(err, "ERERER>>>>>>>>>>>>>>>>>");
      return err;
    })
  );
}
}
