/* tslint:disable:no-string-literal */
import 'zone.js/dist/zone';
import 'reflect-metadata';
import 'rxjs';

import { bootstrap } from "@angular/platform-browser-dynamic"; 
import { Component, OnInit, provide, Inject } from "@angular/core";
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

import RegistrationService from './RegistrationService';
import {Registration} from './Registration';
import {REDIRECT_URL} from './constants';

@Component({
  selector: 'registration-form',
  pipes: [JsonPipe],
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: `
  <div class="container">
    <div class="row stbcolor-secondary sixth top-padding-20">
        <div class="col-md-12">
            <img src="http://piq.codeus.net/static/media/userpics/piq_45027_400x400.png" width="100px" height="100px" style="position: relative; left: -35px"/>
            <h1>Oppstart og registrering</h1>
            <form [ngFormModel]="registrationForm" (ngSubmit)="onSubmit(registrationForm.value)" class="stb-form-inline" role="form">
                <div class="stb-form-group">
                    <label for="name">Navn</label>
                    <input type="text" id="name" [ngFormControl]="name">
                    
                    <label for="email">Epost</label>
                    <input type="text" id="email" placeholder="blah@blah.com" [ngFormControl]="email">
                    
                    <label for="organizationNumber">Organisasjonsnummer</label>
                    <input type="text" id="organizationNumber" placeholder="123456789" [ngFormControl]="organization">
                    
                    <label for="typeOfOrganization">Foretaksform</label>
                    <select [ngFormControl]="organizationType" id="typeOfOrganization"  class="form-control">
                        <option *ngFor="let type of organizationTypes; let i = index" [selected]="i == 0">{{type}}</option>
                    </select>
                    <br/>
                    <button type="submit" class="stb-btn stb-form">OK</button>
                </div>
             </form>
          </div>   
    </div>
  
    
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
  
  organizationTypes: Array<string> = ['ENK','AS'];
  
  registrationService: RegistrationService;
  
  constructor(fb: FormBuilder, @Inject(RegistrationService) registrationService) {
    this.registrationService = registrationService;
    
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
    this.registrationService.post(registrationRequest).subscribe((res: Response) => {
        let params: string = [`email=${registrationRequest.email}`].join('&');
        let queryUrl: string = `${REDIRECT_URL}?${params}`;
        window.location.href = queryUrl;
      });
  }
  
  onSubmit(value: any): void {
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

bootstrap(App, [HTTP_PROVIDERS, provide(RegistrationService, { useClass: RegistrationService })]);