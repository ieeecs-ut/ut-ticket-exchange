import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-buttons',
  templateUrl: './main-buttons.component.html',
  styleUrls: ['./main-buttons.component.css']
})
export class MainButtonsComponent implements OnInit {
  @Input() route: string;
  @Input() buttonName: string;

  constructor() { }

  ngOnInit() {
  }

}
