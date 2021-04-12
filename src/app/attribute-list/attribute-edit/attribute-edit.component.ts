import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from 'src/app/request.service';
import { Attribute } from 'src/app/shared/request.model';

@Component({
  selector: 'app-attribute-edit',
  templateUrl: './attribute-edit.component.html',
  styleUrls: ['./attribute-edit.component.css']
})
export class AttributeEditComponent implements OnInit {
  @Input() attribute: Attribute;

  constructor() { }

  ngOnInit(): void {
  }

  onChange(selectBox, item) {
    this.attribute[item] = selectBox.target.value;
  }
}
