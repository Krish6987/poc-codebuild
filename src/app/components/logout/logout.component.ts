import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    if(this.cookieService.check("email")){
      this.cookieService.delete("email")
      this.router.navigate(['/signin']);
    }
    else{
      this.router.navigate(['/'])
    }
  }

}
