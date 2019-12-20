import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  	title = 'notis-frontend';
    getLoggedIn(){
    // var userData = JSON.parse(localStorage.getItem('userData'));
    // this.sessionkey = userData?userData.sessionkey:'';
    // var userEmail = userData?userData.email:'';
    // var sessMatch = btoa('silverpush#@$2018'+userEmail);
    
    if( localStorage.getItem('isLoggedIn') == "true")
      return true;
    else
      return false;

    //return true // always true for now
  }
}
