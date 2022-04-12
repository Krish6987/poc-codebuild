import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { places } from '../../resources/places';

@Component({
  selector: 'app-accountsettings',
  templateUrl: './accountsettings.component.html',
  styleUrls: ['./accountsettings.component.css']
})
export class AccountsettingsComponent implements OnInit {

  form: FormGroup;
  passwordForm: FormGroup;
  addressForm: FormGroup;
  clickEdit: boolean;
  clickManage: boolean;
  clickChange: boolean;
  loading: boolean;
  message: string = "false";
  user: any;
  countries = places;
  cities: Array<any>;

  constructor(private router: Router, private userService: UserService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.edit();
    let email = this.cookieService.get("email");
    if(email == null)
      this.router.navigate(['/signin'])
    this.addressForm = new FormGroup(
      {
        address: new FormControl('', [Validators.required,
        Validators.minLength(6)]),
        country: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
    })
    this.form = new FormGroup(
      {
        title: new FormControl('', Validators.compose([
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
        mobile: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          ])
        ),
      });
    this.userService.getUser(email).subscribe((res) =>{
      if(res == null){
        this.cookieService.delete("email");
        this.router.navigate(['/signin']);
      }
      this.user=res;
      this.form.setValue({
        title: this.user["title"],
        firstname: this.user["fname"],
        lastname: this.user["lname"],
        mobile: this.user["mobile"]
      })
      this.addressForm.setValue({
        address: this.user["address"],
        country: this.user["country"],
        city: this.user["city"]
      })
      this.changeCountry(this.addressForm.get("country").value)
    })
    this.passwordForm = new FormGroup(
      {
        cupassword: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}'
            ),
          ])
        ),
        npassword: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}'
            ),
          ])
        ),
        cpassword: new FormControl('', [Validators.required]),
      },
      this.pwdMatchValidator
    );
  }

  pwdMatchValidator(frm: FormGroup) {
    return frm.get('npassword').value === frm.get('cpassword').value
      ? null
      : { mismatch: true };
  }

  setValue(){
    this.clickEdit = false
    this.clickChange = false
    this.clickManage = false
    this.loading = false
    this.message = "false"
  }

  changeTitle(title){
    this.form.setValue({
      title: title
    })
  }

  manage(){
    this.setValue()
    this.clickManage = true;
  }

  edit(){
    this.setValue()
    this.clickEdit = true;
  }

  change(){
    this.setValue()
    this.clickChange = true;
  }

  changeCountry(count) {
    if(count !== "")
    this.cities = this.countries.find(con => con.name == count).cities;
  }

  logout(){
    this.router.navigate(['/logout'])
  }

  manageAddress(data){
    this.loading = true
    this.userService.manageAddress(this.user.email, data).subscribe((res) =>{
      if(res == "nouser")
        this.router.navigate(['/signin']);
      else{
        this.message = "true";
        this.loading = false;
      }
    })
  }

  editDetails(data){
    this.loading = true
    this.userService.editDetails(this.user.email, data).subscribe((res) =>{
      if(res == "nouser")
        this.router.navigate(['/signin']);
      else{
        this.message = "true";
        this.loading = false;
      }
    })
  }

  changePassword(data){
    this.loading = true;
    let email = this.cookieService.get("email");
    data["email"] = email
    this.userService.changepassword(data).subscribe((res) =>{
      if(res == "nouser")
        this.router.navigate(['/signin']);
      else if (res == "incorrect"){
        this.message = "incorrect";
        this.loading = false;
      }
      else{
        this.passwordForm.setValue({
          cpassword: "",
          npassword: "",
          cupassword: ""
        })
        this.message = "true";
        this.loading = false;
      }
    })

  }
  

}
