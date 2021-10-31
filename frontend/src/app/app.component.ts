import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ Globals ]
})
export class AppComponent {
  title = 'frontend';

  constructor(private router: Router, matIconRegistry : MatIconRegistry, domSanitizer: DomSanitizer, public globals: Globals) {

    globals.loginPageLoaded = false;
    globals.exc = window['exc'] ? window['exc'] : null;

    matIconRegistry.addSvgIcon(
      'football_icon',
      domSanitizer.bypassSecurityTrustResourceUrl("../img/sports_football-24px.svg")
    )
    matIconRegistry.addSvgIcon(
      'calendar',
      domSanitizer.bypassSecurityTrustResourceUrl("../img/event-24px.svg")
    )
    matIconRegistry.addSvgIcon(
      'location',
      domSanitizer.bypassSecurityTrustResourceUrl("../img/location_on-24px.svg")
    )
    matIconRegistry.addSvgIcon(
      'checkmark',
      domSanitizer.bypassSecurityTrustResourceUrl("../img/check_circle-24px.svg")
    )
  }
    

  goToLogin() {
    this.router.navigate(['/login']); 
  }

  ngAfterViewInit()	{
    console.log("initializing exchange client");
    this.globals.exc.initialize(_ => {
      console.log("initialized exchange client");
    });
  }

}
