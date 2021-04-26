import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { RequestService } from 'src/app/request.service';
import { Request } from 'src/app/shared/request.model';

@Component({
  selector: 'app-settings-table',
  templateUrl: './settings-table.component.html',
  styleUrls: ['./settings-table.component.css'],
})
export class SettingsTableComponent implements OnInit {
  request: Request;

  msTableForm: FormGroup;
  @ViewChild('allSelected') private allSelected: MatOption;

  constructor(private requestModel: RequestService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.request = this.requestModel.getRequest();

    this.requestModel.requestChanged.subscribe((request: Request) => {
      this.request = request;
    });

    this.msTableForm = this.fb.group({
      tableType: new FormControl(''),
    });
  }

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.msTableForm.controls.tableType.patchValue([
        ...this.request.tables.map((tab) => tab.name),
        0,
      ]);
    } else {
      this.msTableForm.controls.tableType.patchValue([]);
    }
    this.onSelectionChange(this.msTableForm.controls.tableType);
  }

  onSelectionChange(event) {
    this.requestModel.getRequest().tables.forEach((table) => {
      if (event.value.includes(table.name)) {
        table.enabled = true;
      } else {
        table.enabled = false;
      }
    });
  }
}
