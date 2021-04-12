import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Attribute } from 'src/app/shared/request.model';

@Component({
  selector: 'app-attribute-item',
  templateUrl: './attribute-item.component.html',
  styleUrls: ['./attribute-item.component.css']
})
export class AttributeItemComponent implements OnInit {
  @Input() attribute: Attribute;
  @Output() attributeSelected = new EventEmitter<Attribute>();


  constructor() { }

  ngOnInit(): void {
  }

  onSelected() {
    this.attributeSelected.emit(this.attribute);
  }

}
