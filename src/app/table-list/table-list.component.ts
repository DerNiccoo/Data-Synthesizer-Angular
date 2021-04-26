import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestService } from '../request.service';
import { Attribute, Request, Table } from '../shared/request.model';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  tables: Table[];

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.tables = this.requestService.getRequest().tables;
    this.requestService.requestChanged.subscribe(
      (requestBody: Request) => {
        this.tables = requestBody.tables;
      }
    );
  }
}
