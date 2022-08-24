import { Component,  OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { CreateRequestComponent } from '../create-request/create-request.component';
import { RequestDetailsComponent } from '../request-details/request-details.component';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {

  requests: Request[] = [];
  displayedColumns: string[] = ['name', 'status', 'description','created', 'symbol'];
  dataSource!:Request[];
  roles: string[] | undefined;
  role: string = '';
  firstName: string | undefined;
  isLoggedIn: boolean = true;
  userProfile: KeycloakProfile = {};


  constructor(private requestService: RequestService,
    private keycloakService: KeycloakService,
    private dialog: MatDialog,
    private auth: AuthService
  ) { 
  }


  async ngOnInit(): Promise<void> {
    
    this.isLoggedIn = await this.auth.isLoggedIn();
    
    this.roles = this.keycloakService.getKeycloakInstance().realmAccess?.['roles'];
    if (this.roles?.indexOf('employee') != -1) {
      this.role = 'employee';
    } else {
      this.role = 'manager';
    }

    if (this.isLoggedIn) { 
      this.userProfile = await this.auth.loadUserProfile();
      this.firstName = this.userProfile.firstName;
    } else {
      this.auth.logout();
    }

    this.requestList();
  }


  requestList() {
    if (this.role == 'manager') {
      this.requestService.getRequestsByCreated(this.firstName?.toLowerCase()).subscribe(data => {
        this.dataSource = data;
      })
    } else {
      this.requestService.getRequestsForUser(this.firstName?.toLowerCase()).subscribe(data=>this.dataSource = data);
    }
  }



  createRequest() {
    this.dialog.open(CreateRequestComponent, {
      width: '1500px',
      height: '600px',

    })
  }

  viewRequestDetails(id:number) {
    this.dialog.open(RequestDetailsComponent, {
      width: '1500px',
      height: '600px',
      data: id,
    }
    )
  }

}
