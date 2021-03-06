import { Component, OnInit } from '@angular/core';
import { RequestService } from './request.service';
import { EvaluationContainer } from './shared/evaluation.model';
import { Attribute, Request, Table } from './shared/request.model';
import { SuggestionModel } from './shared/suggestion.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  requestBody: Request = new Request();
  suggestions: SuggestionModel[] = [];
  evaluations: EvaluationContainer[] = [];

  constructor(private requestService: RequestService) {

  }

  ngOnInit() {
    //this.requestService.setDemo();
    this.requestBody = this.requestService.getRequest();
    this.requestService.requestChanged.subscribe(
      (requestBody: Request) => {
        this.requestBody = requestBody;
      }
    );

    this.suggestions = this.requestService.getSuggestions();
    this.requestService.suggestionsChanged.subscribe(
      (suggestions: SuggestionModel[]) => {
        this.suggestions = suggestions;
      }
    );

    this.evaluations = this.requestService.getEvaluations();
    this.requestService.evaluationsChanged.subscribe(
      (evaluations: EvaluationContainer[]) => {
        this.evaluations = evaluations;
      }
    );
  }
}
