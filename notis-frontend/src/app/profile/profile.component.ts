import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  userdata = JSON.parse(localStorage.getItem('userData'));
  username : 	String = this.userdata.user_name;
  firstname: 	String = this.userdata.first_name;
  lastname:  	String = this.userdata.last_name ? this.userdata.last_name : "";
  empcode: 		String = this.userdata.emp_code;
  user_occupation: 	String = this.userdata.occupation;
  user_email: 		String = this.userdata.email;
  user_phone: 		String = this.userdata.phone;
  user_role: 		String = this.userdata.role;
  last_login_at: 	Date = this.userdata.last_login_at;
  user_img_url : String = this.userdata.user_img_url;
  ngOnInit() {
  }

}
