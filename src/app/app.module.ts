import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakEventType, KeycloakOptions, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuard } from './KeycloakAuth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { RequestDetailsComponent } from './components/request-details/request-details.component';
import { HttpClientModule } from '@angular/common/http';
import { NgGanttEditorModule } from 'ng-gantt';
import { ReactiveFormsModule } from '@angular/forms';

function initializer(keycloak: KeycloakService): () => Promise<boolean> {
  const options: KeycloakOptions = {
    config: environment.keycloak,
    loadUserProfileAtStartUp: true,
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri:
      window.location.origin + '/assets/silent-check-sso.html'
    },
    bearerExcludedUrls: []
  };

  return () => keycloak.init(options);
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateRequestComponent,
    RequestListComponent,
    RequestDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    NgGanttEditorModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
  AuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
