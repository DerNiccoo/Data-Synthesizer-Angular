import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { AttributeItemComponent } from './attribute-list/attribute-item/attribute-item.component';
import { AttributeEditComponent } from './attribute-list/attribute-edit/attribute-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SettingsMetricComponent } from './settings/settings-metric/settings-metric.component';
import { DatabaseSelectComponent } from './database-select/database-select.component';
import { SettingsTableComponent } from './settings/settings-table/settings-table.component';
import { SettingsGeneratorComponent } from './settings/settings-generator/settings-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    AttributeListComponent,
    AttributeItemComponent,
    AttributeEditComponent,
    SettingsMetricComponent,
    DatabaseSelectComponent,
    SettingsTableComponent,
    SettingsGeneratorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatProgressBarModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
