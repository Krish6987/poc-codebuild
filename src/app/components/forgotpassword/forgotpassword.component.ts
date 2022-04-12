import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  form:  FormGroup;
  message: string;
  loading: boolean;

  constructor(private router: Router, private userService: UserService, private cookieService: CookieService) { }

  ngOnInit(): void {
    if(this.cookieService.check("email"))
      this.router.navigate(['/home']);
    this.loading = false;
    this.form=new FormGroup({
      email : new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$')
      ]))
    })
  }

  forgotpassword(email){
    this.loading = true;
    this.userService.forgotpassword(email).subscribe((res) =>{
      if(res == "true"){
        this.loading = false;
        this.form.setValue({email: ''});
        this.message = "done"
      }
      else if(res == "false"){
        this.loading = false;
        this.message = "error"
      }
      else{
        this.loading = false;
        this.message = "invalid"
      }
    })
  }

}
