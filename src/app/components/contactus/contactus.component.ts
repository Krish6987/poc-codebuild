import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  form:  FormGroup;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      firstname : new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*')
      ])),
      lastname : new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*')
      ])),
      email : new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$')
      ])),
      mobile : new FormControl("",  Validators.compose([
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
      ])),
      subject : new FormControl("",  Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      message : new FormControl("",  Validators.compose([
        Validators.required,
        Validators.minLength(10)
      ])),
    })
  }

}
