import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableListComponent } from './table-list/table-list.component';
import { TableItemComponent } from './table-list/table-item/table-item.component';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { AttributeItemComponent } from './attribute-list/attribute-item/attribute-item.component';
import { AttributeEditComponent } from './attribute-list/attribute-edit/attribute-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { SettingsMetricComponent } from './settings/settings-metric/settings-metric.component';
import { DatabaseSelectComponent } from './database-select/database-select.component';
import { SettingsTableComponent } from './settings/settings-table/settings-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    TableListComponent,
    TableItemComponent,
    AttributeListComponent,
    AttributeItemComponent,
    AttributeEditComponent,
    SettingsMetricComponent,
    DatabaseSelectComponent,
    SettingsTableComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
