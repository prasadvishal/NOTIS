import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  username : 	String = "anand001";
  firstname: 	String = "Anand";
  lastname:  	String = "Modi";
  empcode: 		String = "empc001";
  user_occupation: 	String = "COO";
  user_email: 		String = "anand001@wilsone.com";
  user_phone: 		String = "+91 9876543210";
  user_role: 		String = "admin";
  last_login_at: 	Date = new Date(); 
  ngOnInit() {
  }

}
