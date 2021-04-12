import { Component } from '@angular/core';
import { Attribute, Request, Table } from './shared/request.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  requestBody: Request = new Request();

  constructor() {
    this.requestBody.path = "asd";
    this.requestBody.tables = [
      new Table("Player", "CTGAN", [
        new Attribute('ID', 'number', false),
        new Attribute('Player_name', 'string', false),
        new Attribute('Weight', 'number', false),
        new Attribute('Height', 'float', false),
      ]),
      new Table("Player_Attributes", "CTGAN", [
        new Attribute('ID', 'number', false),
        new Attribute('Overall', 'number', false),
        new Attribute('Accuracy', 'number', false),
      ])
    ];
  }
}
