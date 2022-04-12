import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form:  FormGroup;
  email: string
  user: any;
  constructor(private router: Router, private cookieService: CookieService, private userService: UserService) { }

  ngOnInit(): void {
    this.email = this.cookieService.get("email")
    if(this.email===""){
      this.form=new FormGroup({
        email : new FormControl("", Validators.compose([
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$')
        ]))
      })
    }
    else{
      this.userService.getUser(this.email).subscribe((res) =>{
        if(res == null){
          this.cookieService.delete("email");
          this.router.navigate(['/signin']);
        }
        this.user=res;
      })
    }

  }

}
