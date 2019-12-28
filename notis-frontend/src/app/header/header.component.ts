import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
	
	email : String;
	user_img_url : String;
	constructor( private router: Router) { }

  	ngOnInit() {
  		let userData = JSON.parse(localStorage.getItem('userData'));
  		this.email=userData.email;
  		this.user_img_url=userData.user_img_url;
  		if(localStorage.getItem('isLoggedIn') != "true"){
		  this.router.navigate(['/login']);
		}

  	}


	logout() {
	console.log("Logout");
	// this.authService.logout();
	localStorage.setItem('isLoggedIn',"false");
	localStorage.setItem('userData',"");
	this.router.navigate(['/login']);
	}

}
