import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
	
	email : String;
	constructor( private router: Router) { }

  	ngOnInit() {
  		this.email='vishal@notis.nse';
  	}


	logout(): void {
	console.log("Logout");
	// this.authService.logout();
	this.router.navigate(['/login']);
	}

}
