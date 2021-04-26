import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { RequestService } from '../request.service';
import { Attribute, Request, Table } from '../shared/request.model';

@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.css']
})
export class AttributeListComponent implements OnInit {
  msAttrForm: FormGroup;
  @ViewChild('allSelected') private allSelected: MatOption;

  @Input() table: Table;

  selectedAttribute: Attribute;
  selectedTable: Table;

  selected = undefined;
  selectedAttr = undefined;

  availableTables: Table[];

  constructor(private requestModel: RequestService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.msAttrForm = this.fb.group({
      attrType: new FormControl('')
    });

    this.requestModel.tableSelected
      .subscribe(
        (table: Table) => {
          this.selectedTable = table;

          this.msAttrForm = this.fb.group({
            attrType: new FormControl('')
          });
        }
      );
    
    this.availableTables = this.requestModel.getRequest().tables;
    this.requestModel.requestChanged
      .subscribe(
        (request: Request) => {
          this.availableTables = request.tables;
        }
      );
  }

  selectedTableChange() {
    this.requestModel.getRequest().tables.forEach(table => {
      if (table.name === this.selected) {
        this.requestModel.tableSelected.emit(table);
        this.selectedAttribute = undefined;
      }
    });
  }

  selectedAttrChange() {
    this.selectedAttribute = undefined;
    this.requestModel.getRequest().tables.forEach(table => {
      if (table.name === this.selected) {
        table.attributes.forEach(attribute => {
          if (attribute.name === this.selectedAttr) {
            this.selectedAttribute = attribute;
          }
        });
      }
    });
  }

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.msAttrForm.controls.attrType
        .patchValue([...this.selectedTable.attributes.map(attr => attr.name), 0]);      
    } else {
      this.msAttrForm.controls.attrType.patchValue([]);      
    }
    this.onSelectionChange(this.msAttrForm.controls.attrType)
  }

  onSelectionChange(event) {
    this.requestModel.getRequest().tables.forEach(table => {
      if (table.name === this.selected) {
        table.attributes.forEach(attribute => {
          if (event.value.includes(attribute.name)) {
            attribute.enabled = true;
          } else {
            attribute.enabled = false;
          }
        });
      }
    });
  }

}
