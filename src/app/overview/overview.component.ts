import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table'
import { RequestService } from '../request.service';
import { Request } from '../shared/request.model';

export interface OverviewElement {
  name: string;
  datatype: string;
  faker: string;
  transformer: string;
  distribution: string;
  identifier: boolean;
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  requestBody: Request;

  displayedColumns: string[] = ['name', 'datatype', 'faker', 'transformer', 'distribution', 'identifier'];
  dataSource;
  selectedTable;

  constructor(private requestService: RequestService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.requestBody = this.requestService.getRequest();
    this.requestService.requestChanged.subscribe((requestBody: Request) => {
      this.requestBody = requestBody;
      this.createTableData();
    });

    this.createTableData();
  }

  createTableData() {
    let table_data: OverviewElement[] = [];

    this.requestBody.tables.forEach(table => {
      if (table.name === this.selectedTable) {
        table.attributes.forEach(attribute => {
          table_data.push({name: attribute.name, datatype: attribute.dtype, faker: attribute.field_anonymize, transformer: attribute.field_transformer, distribution: attribute.field_distribution, identifier: attribute.sensible})
        });
      }
    });

    this.dataSource = table_data;
    this.changeDetectorRefs.detectChanges();
  }

  selectionChange() {
    this.createTableData();
  }

}
