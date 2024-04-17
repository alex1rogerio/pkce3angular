import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent,{
  providers:[provideHttpClient(),
    importProvidersFrom(
        OAuthModule.forRoot({
            resourceServer: {
            allowedUrls: ['http://localhost:8080/api'],
            sendAccessToken: true
          }
        })
    )]
  })
  .catch((err) => console.error(err));
