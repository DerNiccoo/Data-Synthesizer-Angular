import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from 'src/app/request.service';
import { SuggestionModel } from 'src/app/shared/suggestion.model';

@Component({
  selector: 'app-suggestion-item',
  templateUrl: './suggestion-item.component.html',
  styleUrls: ['./suggestion-item.component.css']
})
export class SuggestionItemComponent implements OnInit {
  
  @Input() item: SuggestionModel;

  info_text: string;

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    if (this.item.category === 'Faker') {
      this.info_text = 'Quasi-identifer \''+ this.item.attribute +'\' erkannt, für mehr Sicherheit wird eine Generierung mittels Faker:'+ this.item.solution +' empfohlen.'
    } else if (this.item.category === 'Datatype') {
      this.info_text = 'Anfälliger Datentyp erkannt, für eine bessere Datenqualität wird eine Generierung als Datatype:' + this.item.solution +' empfohlen.'
    }
  }

  onClickIgnore() {
    this.requestService.removeSuggestion(this.item);
  }

  onClickOK() {
    this.requestService.setAttributeByFields(this.item.table, this.item.attribute, this.item.category, this.item.solution);
    this.requestService.removeSuggestion(this.item);
  }

  onClickDelete() {
    this.requestService.setAttributeByFields(this.item.table, this.item.attribute, 'remove', '');
    this.requestService.removeSuggestion(this.item);
  }
}
