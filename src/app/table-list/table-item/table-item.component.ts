import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestService } from 'src/app/request.service';
import { Table } from 'src/app/shared/request.model';

@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.css']
})
export class TableItemComponent implements OnInit {
  @Input() table: Table;


  constructor(private requestModel: RequestService) { }

  ngOnInit(): void {
  }

  onSelected() {
    this.requestModel.tableSelected.emit(this.table);
  }
}
