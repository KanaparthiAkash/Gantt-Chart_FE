import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // isloggedIn = true;
  firstName: string | undefined;
   isLoggedIn:boolean = true;
  loggedIn: boolean = false;
  userProfile: KeycloakProfile = {};
  

 
  constructor(private auth: AuthService,
   
  ) { }

  async ngOnInit(): Promise<void> {
    this.loggedIn = await this.auth.isLoggedIn();
  
    if (this.isLoggedIn) { 
      this.userProfile = await this.auth.loadUserProfile();
      this.firstName = this.userProfile.firstName;
    } else {
      this.auth.logout();
    }
   
  }
  logout() {
    this.auth.logout();
  }


  
}
