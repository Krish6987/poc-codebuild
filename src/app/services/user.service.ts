import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addUser(user: {fname: String, lname: String, email: String, password: String, mobile: String, country: String, city: String}){
    return this.http.post(this.url+"/signup", user, {responseType: 'text'});
  }

  signin(data: {email: String, password: String}){
    return this.http.post(this.url+"/signin", data, {responseType: 'text'});
  }

  forgotpassword(email: string){
    return this.http.post(this.url+"/forgotpassword", email, {responseType: 'text'});
  }

  changepassword(data: any){
    return this.http.post(this.url+"/changepassword", data, {responseType: 'text'});
  }

  editDetails(email: string, data: any){
    return this.http.post(this.url+"/editdetails/"+email, data, {responseType: 'text'});
  }

  manageAddress(email: string, data: any){
    return this.http.post(this.url+"/manageaddress/"+email, data, {responseType: 'text'});
  }

  getUser(email: string){
    return this.http.get(this.url+"/getuser/"+email);
  }
}