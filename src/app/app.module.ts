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
import { MatTableModule } from '@angular/material/table'  
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { SettingsMetricComponent } from './settings/settings-metric/settings-metric.component';
import { DatabaseSelectComponent } from './database-select/database-select.component';
import { SettingsTableComponent } from './settings/settings-table/settings-table.component';
import { SettingsGeneratorComponent } from './settings/settings-generator/settings-generator.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { SuggestionItemComponent } from './suggestion/suggestion-item/suggestion-item.component';
import { OverviewComponent } from './overview/overview.component';

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
    SuggestionComponent,
    SuggestionItemComponent,
    OverviewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
