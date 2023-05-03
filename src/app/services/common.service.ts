import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { commonHeaders } from "./common.headers";
import {Router} from '@angular/router';
import { Order } from 'app/models/order';
import { OrderLine } from 'app/models/orderlines';
import { Users } from 'app/models/users';


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

  signup(user: Users) {
    console.log("in the service method ", user)
      return this.http.post(this.baseUrl + `users`, user,{
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

  getdistributorInfo(){
      return this.http.get(this.baseUrl + `distributor`,{
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

  getproductInfo(){
    return this.http.get(this.baseUrl + `product`,{
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


  createOrders(orderData: Order) {
    console.log("service", orderData);
    return this.http.post(this.baseUrl + `order`, orderData, {
      headers: commonHeaders,
    })
    .pipe(
      map((data) => {
        console.log("Order", data);
        return data;
      })
    )
    .pipe(
      catchError((err) => {
        console.log(err, "ERERER>>>>>>>>>>>>>>>>>");
        alert(err.statusText);
        return err;
      })
    );
  }

  createOrderLines(orderId, orderLine: OrderLine) {
    console.log("service", orderLine);
    return this.http.post(this.baseUrl + `orders/${orderId}/order-lines`, orderLine, {
      headers: commonHeaders,
    })
    .pipe(
      map((data) => {
        console.log("Order Line", data);
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
