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
  organizationNumber: number;
  numberOfEmployees: number;
  typeOfOrganization: string;
  
  constructor(obj?: any) {
    this.name                   = obj && obj.name                   || null;
    this.email                  = obj && obj.email                  || null;
    this.organizationNumber     = obj && obj.organizationNumber     || null;
    this.numberOfEmployees      = obj && obj.numberOfEmployees      || null;
    this.typeOfOrganization     = obj && obj.typeOfOrganization     || null;
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
        <input type="text" id="organizationNumber" placeholder="SKU" [ngFormControl]="organizationNumber">
        
        <label for="numberOfEmployees">NumberOfEmployees</label>
        <input type="number" id="numberOfEmployees" placeholder="SKU" [ngFormControl]="numberOfEmployees">
        
        <label for="typeOfOrganization">TypeOfOrganization</label>
        <select [ngFormControl]="typeOfOrganization" id="typeOfOrganization">
           <option *ngFor="let organizationType of organizationTypes; let i = index" [selected]="i == 0">{{organizationType}}</option>
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
  organizationNumber: AbstractControl;
  numberOfEmployees: AbstractControl;
  typeOfOrganization: AbstractControl;
  
  data: Object;
  loading: boolean;
  
  organizationTypes: Array<string> = ['1','2'];

  constructor(fb: FormBuilder, public http: Http) {
    this.registrationForm = fb.group({
      'name':                   ['', Validators.compose([Validators.required])],
      'email':                  ['', Validators.compose([Validators.required])],
      'organizationNumber':     ['', Validators.compose([Validators.required])],
      'numberOfEmployees':      ['', Validators.compose([Validators.required])],
      'typeOfOrganization':     ['', Validators.compose([Validators.required])]
    });

    this.name                   = this.registrationForm.controls['name'];
    this.email                  = this.registrationForm.controls['email'];
    this.organizationNumber     = this.registrationForm.controls['organizationNumber'];
    this.numberOfEmployees      = this.registrationForm.controls['numberOfEmployees'];
    this.typeOfOrganization     = this.registrationForm.controls['typeOfOrganization']; 
  }
  
  makePost(registrationRequest: Registration): void {
    console.log("request: ",registrationRequest);  
    this.loading = true;
    this.http.post(
      'http://www.mocky.io/v2/5185415ba171ea3a00704eed',
      JSON.stringify({
        body: 'bar',
        title: 'foo',
        userId: 1
      }))
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
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