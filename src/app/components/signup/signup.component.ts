import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { places } from '../../resources/places';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  user: any;
  loading: boolean;
  error: boolean;
  countries = places;
  cities: Array<any>;
  constructor(private router: Router, private userService: UserService, private cookieService: CookieService) {}

  ngOnInit(): void {
    if(this.cookieService.check("email"))
      this.router.navigate(['/home']);
    this.loading = false;
    this.error = false;

    this.form = new FormGroup(
      {
        title: new FormControl('Mr', Validators.compose([
          Validators.required,
          ])
        ),
        firstname: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('[a-zA-Z ]*'),
          ])
        ),
        lastname: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('[a-zA-Z ]*'),
          ])
        ),
        email: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,5}$'),
          ])
        ),
        mobile: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          ])
        ),
        password: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}'
            ),
          ])
        ),
        confirmpassword: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
      },
      this.pwdMatchValidator
    );
  }
  pwdMatchValidator(frm: FormGroup) {
    return frm.get('password').value === frm.get('confirmpassword').value
      ? null
      : { mismatch: true };
  }

  changeTitle(title){
    this.form.setValue({
      title: title
    })
  }

  changeCountry(count) {
    if(count !== "")
    this.cities = this.countries.find(con => con.name == count).cities;
  }

  signup(data: any) {
    this.loading = true;
    this.user = {
      title: data.title,
      fname: data.firstname,
      lname: data.lastname,
      email: data.email,
      password: data.password,
      mobile: String(data.mobile),
      address: null,
      country: data.country,
      city: data.city
    }
    this.userService.addUser(this.user).subscribe((res) =>{
      this.loading = false;
      if(res == "true"){
        this.router.navigate(['/signin']);
      }
      else if(res == "false"){
        this.error = true;
      }
    });

  }
}
