import {
  Component,
  Injectable,
  bind,
  OnInit,
  ElementRef,
  EventEmitter,
  Inject
} from '@angular/core';

import {
  Http,
  Response,
  RequestOptions,
  Headers
} from '@angular/http';

import { Observable } from 'rxjs';
import {Registration} from './Registration';
import {REGISTRATION_API_URL} from './constants';

@Injectable()
export default class RegistrationService {
  constructor(public http: Http) {
  }

  post(registrationRequest: Registration): Observable<any> {
    const body = JSON.stringify(registrationRequest);
    
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    
     return this.http.post(REGISTRATION_API_URL, body, opts);
  }
}