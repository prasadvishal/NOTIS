import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  	localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('userData', '');
    localStorage.setItem('marketType', '');
    localStorage.setItem('token', '');
  	this.router.navigate(['/login']);
  }

}
