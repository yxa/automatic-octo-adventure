/* tslint:disable:no-string-literal */
import 'zone.js/dist/zone';
import 'reflect-metadata';
import 'rxjs';

import { bootstrap } from "@angular/platform-browser-dynamic"; 
import { Component, OnInit } from "@angular/core";
import {
  CORE_DIRECTIVES,
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Validators,
  AbstractControl,
  Control,
  JsonPipe
} from '@angular/common';

import {
  Http,
  Response,
  RequestOptions,
  Headers
} from '@angular/http';

import { HTTP_PROVIDERS } from '@angular/http';

function skuValidator(control: Control): { [s: string]: boolean } {
  if (!control.value.match(/^123/)) {
    return {invalidSku: true};
  }
}


class Registration {
  name: string;
  email: string;
  organization: string;
  organizationType: string;
  
  constructor(obj?: any) {
    this.name                   = obj && obj.name                   || null;
    this.email                  = obj && obj.email                  || null;
    this.organization           = obj && obj.organization           || null;
    this.organizationType       = obj && obj.organizationType       || null;
  }
}

@Component({
  selector: 'registration-form',
  
  pipes: [JsonPipe],
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: `
  <div class="ui raised segment">
    <h2 class="ui header">Registration</h2>
    <form [ngFormModel]="registrationForm" (ngSubmit)="onSubmit(registrationForm.value)" class="ui form">
      <div class="field" [class.error]="!name.valid && name.touched">
        <label for="name">Name</label>
        <input type="text" id="name" placeholder="SKU" [ngFormControl]="name">
        
        <label for="email">Email</label>
        <input type="text" id="email" placeholder="SKU" [ngFormControl]="email">
        
        <label for="organizationNumber">OrganizationNumber</label>
        <input type="text" id="organizationNumber" placeholder="SKU" [ngFormControl]="organization">
       
        
        <label for="typeOfOrganization">TypeOfOrganization</label>
        <select [ngFormControl]="organizationType" id="typeOfOrganization">
           <option *ngFor="let type of organizationTypes; let i = index" [selected]="i == 0">{{type}}</option>
        </select>
      </div>
      <button type="submit" class="ui button">Submit</button>
    </form>
    
    <div *ngIf="loading">loading...</div>
    <pre>{{data | json}}</pre>
  </div>
  `
})
class RegistrationForm {
  registrationForm: ControlGroup;
  name: AbstractControl;
  email: AbstractControl;
  organization: AbstractControl;
  organizationType: AbstractControl;
  
  data: Object;
  loading: boolean;
  
  organizationTypes: Array<string> = ['ENK','AS'];

  constructor(fb: FormBuilder, public http: Http) {
    this.registrationForm = fb.group({
      'name':                   ['tester testersen', Validators.compose([Validators.required])],
      'email':                  ['beep@boop.com', Validators.compose([Validators.required])],
      'organization':           ['123456789', Validators.compose([Validators.required])],
      'organizationType':       ['ENK', Validators.compose([Validators.required])]
    });

    this.name                   = this.registrationForm.controls['name'];
    this.email                  = this.registrationForm.controls['email'];
    this.organization           = this.registrationForm.controls['organization'];
    this.organizationType       = this.registrationForm.controls['organizationType']; 
  }
  
  makePost(registrationRequest: Registration): void {
    console.log("request: ",registrationRequest);  
    
    const body = JSON.stringify(registrationRequest);
    
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    
    let opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
   
    this.loading = true;
  
    this.http.post(
      'https://hc2016-admin-backend.herokuapp.com/api/register',
      body, opts)
      .subscribe((res: Response) => {
        this.loading = false;
        window.location.href='https://hc2016-pusher.herokuapp.com?email=' + registrationRequest.email;
      });
  }

  onSubmit(value: any): void {
    console.log('you submitted value: ', value);
    this.makePost(new Registration(value));
  }
}

@Component({
  selector: 'registration',
  directives: [RegistrationForm],
  template: `<div><registration-form></registration-form></div>`
})
class App {
    constructor() {
    }
}

bootstrap(App, [HTTP_PROVIDERS]);