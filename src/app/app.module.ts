import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { ModalPopupComponent } from './modal-popup/modal-popup.component';
import { TableListComponent } from './table-list/table-list.component';
import { TableItemComponent } from './table-list/table-item/table-item.component';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { AttributeItemComponent } from './attribute-list/attribute-item/attribute-item.component';
import { AttributeEditComponent } from './attribute-list/attribute-edit/attribute-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    ModalComponent,
    ModalPopupComponent,
    TableListComponent,
    TableItemComponent,
    AttributeListComponent,
    AttributeItemComponent,
    AttributeEditComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
