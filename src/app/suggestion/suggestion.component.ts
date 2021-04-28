import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { SuggestionModel } from '../shared/suggestion.model';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {
  suggestions: SuggestionModel[];

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.suggestions = this.requestService.getSuggestions();
    this.requestService.suggestionsChanged.subscribe(
      (suggestions: SuggestionModel[]) => {
        this.suggestions = suggestions;
      }
    );    
  }

}
