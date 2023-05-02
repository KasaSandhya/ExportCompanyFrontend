import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'app/services/common.service';
import { NotificationsService } from 'app/services/notifications.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: any = FormGroup;
  hide: boolean = true;

  constructor(private formBuilder: FormBuilder, private commonService: CommonService,
              private router: Router, private notification: NotificationsService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email:    ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  myFunction() {
    this.hide = !this.hide;
  }

  signup(){
    if(!this.signupForm.valid){
      this.notification.showNotification("Please fill required elements", 'danger');
      return false;
    }
    console.log("in constructor", this.signupForm.value)
    this.commonService.signup(this.signupForm.value)
      .subscribe((response) => {
          console.log("response", response);
          if(response !== null){
            this.router.navigate(['/signin']);
          }else{
            this.notification.showNotification("Bad Credentials", 'danger');
            this.router.navigate(['/signup']);
          }
    });
  }

}
