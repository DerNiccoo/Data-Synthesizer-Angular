import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Attribute, Table } from '../shared/request.model';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  @Input() tables: Table[];

  constructor() { }

  ngOnInit(): void {
  }
}
