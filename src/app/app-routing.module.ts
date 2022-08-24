import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RequestDetailsComponent } from './components/request-details/request-details.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { AuthGuard } from './KeycloakAuth.guard';
import { Role } from './models/role';

const routes: Routes = [

  {
    path: '', component: NavbarComponent,
    data: {
      roles: [Role.USER]
    },
    canActivate: [AuthGuard]
  },
  { path: 'create-request', component: CreateRequestComponent },
  {
    path: 'request-details/:id',component: RequestDetailsComponent
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
