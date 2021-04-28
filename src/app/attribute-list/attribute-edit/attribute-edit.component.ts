import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from 'src/app/request.service';
import { Attribute } from 'src/app/shared/request.model';

@Component({
  selector: 'app-attribute-edit',
  templateUrl: './attribute-edit.component.html',
  styleUrls: ['./attribute-edit.component.css']
})
export class AttributeEditComponent implements OnInit {
  private _attribute: Attribute;

  datatypeSelect: string = 'Datentyp';
  fakerSelect: string = 'Faker';
  transformerSelect: string = 'Transformer';
  distributionSelect: string = 'Distribution';

  @Input()
  set attribute(attr: Attribute) {
    this._attribute = attr

    this.datatypeSelect = attr.dtype == null ? 'Datentyp' : attr.dtype;
    this.fakerSelect = attr.field_anonymize == null ? 'Faker' : attr.dtype;
    this.transformerSelect = attr.field_transform == null ? 'Transformer' : attr.dtype;
    this.distributionSelect = attr.field_distribution == null ? 'Distribution' : attr.dtype;
  }
  get attribute(): Attribute { return this._attribute; }

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
  }

  onChange(selectBox, item) {
    let value = selectBox.target.value
    if (value === 'Datentyp' || value === 'Faker' ||
        value === 'Transformer' || value === 'Distribution' || value === 'Identifier'){
      value = null;
    }
    this._attribute[item] = value;
    this.requestService.setAttribute(this._attribute);
  }
}
