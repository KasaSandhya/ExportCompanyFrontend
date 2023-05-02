import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-display-order-lines',
  templateUrl: './display-order-lines.component.html',
  styleUrls: ['./display-order-lines.component.scss']
})
export class DisplayOrderLinesComponent implements OnInit {

  ordersInfo: any = FormGroup;
  ordersList: any =[];
  isShow: boolean = false;

  constructor(private commonService: CommonService, private formBuilder: FormBuilder) { }

  getOrderDetails(){
    console.log("in getOrderDetails")
    console.log("value", this.ordersInfo.value.orderId)
    var id = this.ordersInfo.value.orderId;
    console.log(id)
    this.commonService.getOrdersInfo(id).subscribe((response) => {
      console.log("response", response);
      this.ordersList = response;
      if(this.ordersList.orderLines.length > 0){
        //this.isShow = true;
      }
    });
    
  }

  ngOnInit(): void {
    this.ordersInfo = this.formBuilder.group({
      orderId: ['', Validators.required]
    });
  }

}
