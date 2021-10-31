import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  loginPageLoaded: boolean = false;
  contactPageLoaded: boolean = false;
  exc: any = null;
}