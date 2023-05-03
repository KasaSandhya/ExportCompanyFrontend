import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonService } from 'app/services/common.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NotificationsService } from 'app/services/notifications.service';

@Component({
  selector: 'app-create-orders',
  templateUrl: './create-orders.component.html',
  styleUrls: ['./create-orders.component.scss']
})
export class CreateOrdersComponent implements OnInit {
  orderForm: any = FormGroup;
  //orderLinesForm: any = FormGroup;
  orderLinesForm: FormGroup;
  submitted = false;
  orderInfo : any =[];
  distributorInfo: any = [];
  productInfo: any = [];

  constructor(private formBuilder: FormBuilder, private notification: NotificationsService,
    private commonService:CommonService, private datePipe: DatePipe,) { 
      this.orderLinesForm = this.formBuilder.group({  
        orderLines: this.formBuilder.array([]),  
      });
      this.commonService.getdistributorInfo().subscribe((response) => {
        if(response !== null){ 
          this.distributorInfo = response;
        }
      })
      this.commonService.getproductInfo().subscribe((response) => {
        if(response !== null){ 
          this.productInfo = response;
        }
      })

    }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      distributorId: ['', Validators.required],
      orderDate: ['', Validators.required]
    });
  }

  changeDestributor(e: any) {
    this.orderForm.get('distributorId').setValue(e.value);
  }

  changeProduct(index, e: any){
    this.orderLines().at(index).get('linenum').setValue(index+1);
    this.orderLines().at(index).get('productId').setValue(e.value.id);
    if(this.orderLines().at(index).get('quantity')?.value > 0){
      this.orderLines().at(index).get('price').setValue(e.value.price * this.orderLines().at(index).get('quantity')?.value);
    } else {
      this.orderLines().at(index).get('price').setValue(e.value.price);
    }
  }

  quantityChange(index, e: any){
    for (let product of this.productInfo) {
      if (product.id === this.orderLines().at(index).get('productId').value){
        this.orderLines().at(index).get('price').setValue(product.price * e.target.value);
      }
    }
  }

  orderLines() : FormArray {  
    return this.orderLinesForm.get("orderLines") as FormArray  
  }

  createOrder(){
    if(!this.orderForm.valid){
      this.notification.showNotification("Please fill required elements", 'danger');
      return false;
    }
    this.submitted = true;
    if (this.orderForm.value.orderDate){
      //this.orderForm.value.orderDate = this.datePipe.transform(this.orderForm.get('orderDate').value, 'yyyy-MM-dd HH:mm:ss Z');
      this.orderForm.value.orderDate = moment(this.orderForm.value.orderDate).toISOString()
    }
    console.log(this.orderForm.value);
    if (this.orderForm.valid) {
      this.commonService.createOrders(this.orderForm.value).subscribe((response) => {
        if(response !== null){ 
          this.orderInfo = response;
          this.notification.showNotification("Create Order Successful", 'success');
          console.log("this.orderInfo.id",this.orderInfo.id)
        }
      });
    }
  }
  createOrderLine(){
    this.submitted = true;
    
    for(let orderLine of  this.orderLinesForm.value.orderLines){
      if (this.orderLinesForm.valid) {
        this.commonService.createOrderLines(this.orderInfo.id, orderLine)
          .pipe()
          .subscribe({
              next: () => {
                this.notification.showNotification("Create Order Line Successful", 'success');
              },
              error: (error: any) => {
                  console.log('error',error);
                  this.notification.showNotification(error, 'danger');
              }
          });
      }
    }
  }

  newOrderLine(): FormGroup {  
    return this.formBuilder.group({  
      linenum: '',
      price: '',
      productId: '',
      quantity: '' 
    })  
  }  
     
  addOrderLine() {  
    this.orderLines().push(this.newOrderLine());  
  }  
     
  removeOrderLine(i:number) {  
    this.orderLines().removeAt(i);  
  }  
  
}
