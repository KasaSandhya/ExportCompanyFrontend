import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'app/services/common.service';
import {Router} from '@angular/router';
import { NotificationsService } from 'app/services/notifications.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  loginForm: any = FormGroup;
  hide: boolean = true;
  
  constructor(private formBuilder: FormBuilder, private commonService: CommonService,
              private router: Router, private notification: NotificationsService) { 

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  myFunction() {
    this.hide = !this.hide;
  }
  
  login(){
    if(!this.loginForm.valid){
       this.notification.showNotification("Please fill required elements", 'danger');
       return false;
    }
    console.log("in constructor", this.loginForm.value.userName)
    this.commonService.login(this.loginForm.value.userName, this.loginForm.value.password).subscribe((response) => {
      console.log("response", response);
      if(response !== null){
        console.log("in if condition")
        this.router.navigate(['/dashboard']);
      }else{
        this.notification.showNotification("Bad Credentials", 'danger');
        this.router.navigate(['/signin']);
      }
    });
    
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
