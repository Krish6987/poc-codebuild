import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RecaptchaModule } from 'angular-google-recaptcha';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AccountsettingsComponent } from './components/accountsettings/accountsettings.component';

import { CookieService } from 'ngx-cookie-service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactusComponent,
    SignupComponent,
    SigninComponent,
    ForgotpasswordComponent,
    FooterComponent,
    HomeComponent,
    LogoutComponent,
    AccountsettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaModule.forRoot({
      siteKey: '6LcT6OIZAAAAAFfL4tPgcx7BxYbqGjFDFB-JuU9J',
  }),
  ],
  providers: [CookieService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
