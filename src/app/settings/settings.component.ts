import { Component, Input, OnInit } from '@angular/core';
import { Attribute, Request, Table } from '../shared/request.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @Input() requestBody: Request;

  constructor() { }

  ngOnInit(): void {
  }

  removeNonEnabled() {
    let request = new Request();
    request.path = this.requestBody.path;
    request.tables = [];

    this.requestBody.tables.forEach(table => {
      if (table.enabled) {
        let attributes = []
        table.attributes.forEach(attribute => {
          if (attribute.enabled) {
            attributes.push(attribute);
          }          
        });

        request.tables.push(new Table(table.name, table.model, attributes));
      }
    });

    return request;
  }

  onRun() {
    const request = this.removeNonEnabled();
    console.log(request);
    console.log(this.requestBody);
  }
}
