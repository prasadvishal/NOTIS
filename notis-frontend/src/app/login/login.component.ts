import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { NotificationService } from '../notification/services/notification.service';
// import { LoginResultModel } from './model/LoginResultModel';
//import * as $ from 'jquery'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
	public marketIds: Array<string> = ['CM', 'FO', 'CD', 'DT', 'SLB' , 'CO'];

  public form: FormGroup;                   // {1}
  private formSubmitAttempt: boolean; 	// {2}
  hideLoader: boolean = true;
  isLoggedIn$: boolean;
  message: string = null;
  public loginbtn: string = 'Login';
  
  constructor(
    private fb: FormBuilder,         	// {3}
    //private authService: AuthService, // {4}
    private loginService: LoginService, 
    private router: Router,
    private notificationService: NotificationService,
  ) { }


  ngOnInit() {
  	if(localStorage.getItem('isLoggedIn') == 'true'){
      	this.router.navigate(['/summary']);

  	}else{
  		this.form = this.fb.group({     // {5}
	    	marketId: ['', Validators.required],
	    	memberId: ['', Validators.required],
	      	userId: ['', Validators.required],
	      	password: ['', Validators.required]
    	});
  	}
    // this.returnUrl = '/summary';
    //this.authService.logout();

  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }


  onSubmit() {
    console.log("this.form.value",this.form.value);

    if (this.form.valid) {
      this.loginbtn = 'Loading...';
      let loginData = this.form.value;
      if(loginData.marketId &&  this.marketIds.includes(loginData.marketId) && loginData.memberId =='111'){
        this.hideLoader = false;

        this.loginService.userLogin({user_name: loginData.userId, password:loginData.password, market:loginData.marketId}).subscribe((data: any) => {
          if(data.code == 200 && data.data.token){
            if(data.data.permitted_markets){
              let allowed_markets = data.data.permitted_markets.split(',');
              if(!allowed_markets || allowed_markets.length < 1 || !allowed_markets.includes(loginData.marketId)){
                  this.notificationService.show("You don't have Rights to view this Market. Please connect Admin Team for viewing Rights.");
                  this.loginbtn = 'Login';
                  localStorage.setItem('isLoggedIn', 'false');
                  localStorage.setItem('userData', "");
              }else{
                  localStorage.setItem('isLoggedIn', 'true');
                  localStorage.setItem('token', data.data.token);
                  localStorage.setItem('userData', JSON.stringify(data.data));
                  localStorage.setItem('marketType', loginData.marketId);
                  console.log("login() TOKEN -------> ",localStorage.getItem('token'))
                  this.router.navigate(['/summary']);
              }
            }
            else{
              this.notificationService.show("You don't have any Market assigned, Please connect Admin Team for viewing Rights.");
              this.loginbtn = 'Login';
              localStorage.setItem('isLoggedIn', 'false');
              localStorage.setItem('userData', "");
            }
          }else{
             this.loginbtn = 'Login';
             localStorage.setItem('isLoggedIn', 'false');
             localStorage.setItem('userData', "");
             this.message =  data.error || data.msg;
             this.notificationService.show(data.error || data.msg);
          }
          this.hideLoader = true;

        });
      	// if(loginData.userId == 1 && loginData.password == 'admin123'){
      	// 	console.log("Logged In");
      	// 	localStorage.setItem('isLoggedIn', 'true');
      	// 	localStorage.setItem('userData', JSON.stringify(loginData));
      	// 	this.router.navigate(['/summary']);
      	// }else{      
      	// 	this.loginbtn = 'Login';
      	// 	localStorage.setItem('isLoggedIn', 'false');
      	// 	localStorage.setItem('userData', "");
      	// 	this.message = 'Invalid! username and password.';
      	// }
        
      }else{
      		localStorage.setItem('isLoggedIn', 'false');
      		localStorage.setItem('userData', '');
      	    this.loginbtn = 'Login';
      		  this.message = 'Invalid! market/member id.';
      }
      // this.authService.login(this.form.value).subscribe((data: LoginResultModel) => {
      //   if (data.code == 202) {
      //     localStorage.setItem('isLoggedIn', "true");
      //     localStorage.setItem('userData', JSON.stringify(data.results.user));
      //     this.router.navigate([this.returnUrl]);
      //   } else {
      //     this.loginbtn = 'Login';
      //     this.message = 'Invalid! username and password.';
      //   }
      // }, error => {
      //   console.error("Error in getting user data!", error);
      // });
    }
    this.formSubmitAttempt = true;
  }


}
