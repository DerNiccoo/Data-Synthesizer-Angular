import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Attribute, Table } from '../shared/request.model';

@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.css']
})
export class AttributeListComponent implements OnInit {
  @Input() table: Table;

  selectedAttribute: Attribute;
  selectedTable: Table;

  constructor(private requestModel: RequestService) { }

  ngOnInit(): void {
    this.requestModel.tableSelected
      .subscribe(
        (table: Table) => {
          this.selectedTable = table;
        }
      );
  }

}
