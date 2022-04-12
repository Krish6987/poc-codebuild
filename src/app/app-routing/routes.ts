import { Routes } from '@angular/router';

import { ContactusComponent } from '../components/contactus/contactus.component';
import { SigninComponent } from '../components/signin/signin.component';
import { SignupComponent } from '../components/signup/signup.component';
import { ForgotpasswordComponent } from '../components/forgotpassword/forgotpassword.component';
import { HomeComponent } from '../components/home/home.component';
import { LogoutComponent } from '../components/logout/logout.component';
import { AccountsettingsComponent } from '../components/accountsettings/accountsettings.component';

export const routes: Routes = [
    { path: '',  component: HomeComponent },
    { path: 'contact',  component: ContactusComponent },
    { path: 'signin',  component: SigninComponent },
    { path: 'signup',  component: SignupComponent },
    { path: 'forgotpassword',  component: ForgotpasswordComponent },
    { path: 'logout',  component: LogoutComponent },
    { path: 'account', component: AccountsettingsComponent },
    { path: 'home', redirectTo: '/', pathMatch: 'full'}
];
