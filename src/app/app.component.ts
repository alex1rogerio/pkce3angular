import { Component, OnDestroy, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AppService } from './app.service';
import { authConfig } from './auth.config';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {
  title = 'frontend';
  text = '';
  tokenString = '';
  helloSubscription: Subscription = new Subscription;

  constructor(private oauthService: OAuthService, private appService: AppService) {
    this.configure();
  }
  ngOnDestroy(): void {
    this.helloSubscription.unsubscribe();
  }

  login() {
    this.oauthService.initCodeFlow();
    this.tokenString = this.oauthService.authorizationHeader();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  logout() {
    this.oauthService.logOut();
  }

  token() {
    this.tokenString = this.oauthService.authorizationHeader();
    this.helloSubscription =  this.appService.hello(this.oauthService.authorizationHeader()).subscribe(response => {
      this.text = response;
    });


  }


}
