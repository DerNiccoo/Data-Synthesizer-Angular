import { EventEmitter, Injectable } from "@angular/core";
import { EvaluationModel } from "./shared/evaluation.model";
import { Attribute, Request, Table } from './shared/request.model';
import { SuggestionModel } from './shared/suggestion.model';

@Injectable({providedIn: 'root'})
export class RequestService {
  requestChanged = new EventEmitter<Request>();
  tableSelected = new EventEmitter<Table>();
  suggestionsChanged = new EventEmitter<SuggestionModel[]>();
  evaluationsChanged = new EventEmitter<EvaluationModel[]>();

  private requestModel: Request = new Request();
  private suggestions: SuggestionModel[] = [];
  private evaluations: EvaluationModel[] = [];

  setDemo() {
    this.requestModel.path = "asd";
    this.requestModel.tables = [
      new Table("Player", "CTGAN", [
        new Attribute('ID', 'number', false),
        new Attribute('Player_name', 'string', false),
        new Attribute('Weight', 'number', false),
        new Attribute('Height', 'float', false),
      ]),
      new Table("Player_Attributes", "CTGAN", [
        new Attribute('ID', 'number', false),
        new Attribute('Overall', 'number', false),
        new Attribute('Accuracy', 'number', false),
      ])
    ];
    this.requestModel.tables[0].enabled = true;
  }

  getRequest() {
    return this.requestModel;
  }

  getTableByName(name: string) {
    this.requestModel.tables.forEach(table => {
      if (table.name === name) {
        return table;
      }
    });
  }

  setGenerator(generator: string) {
    this.requestModel.tables.forEach(table => {
      table.model = generator;
    });
    this.requestChanged.emit(this.requestModel);
  }

  setRequest(reqeustBody: Request) {
    this.requestModel = reqeustBody;
    this.requestChanged.emit(this.requestModel);
  }

  setPath(path: string) {
    this.requestModel.path = path
    this.requestChanged.emit(this.requestModel);
  }

  setTable(name: string, attributes: Attribute[], model: string = 'GaussianCopula') {
    this.requestModel.tables.push(new Table(name, model, attributes))
  }

  setEvaluators(evaluators) {
    this.requestModel.evaluators = evaluators;
    this.requestChanged.emit(this.requestModel);
  }

  setAttribute(attr: Attribute) {
    //Right now no clue how i could move the code from attribute-edit where i dirty change it to here...
    this.requestChanged.emit(this.requestModel);
  }

  setAttributeByFields(tableName: string, attrName: string, category: string, value: string) {
    this.requestModel.tables.forEach(table => {
      if (table.name === tableName) {
        table.attributes.forEach(attr => {
          if (attr.name === attrName) {
            if (category === 'Datatype') {
              attr.dtype = value.toLowerCase();
            } else if (category === 'Faker') {
              attr.field_anonymize = value.toLowerCase();
            } else if (category === 'remove') {
              attr.enabled = false;
            }
            return;
          }
        });
      }
    });

    this.requestChanged.emit(this.requestModel);
  }

  setSuggestions(suggestions: SuggestionModel[]) {
    this.suggestions = suggestions;
    this.suggestionsChanged.emit(this.suggestions);
  }

  getSuggestions() {
    return this.suggestions.slice();
  }

  removeSuggestion(suggestion: SuggestionModel) {
    const index = this.suggestions.indexOf(suggestion);

    if (index > -1) {
      this.suggestions.splice(index, 1);
    }

    this.suggestionsChanged.emit(this.suggestions);
  }

  setEvaluations(evaluations: EvaluationModel[]) {
    this.evaluations = evaluations;
    this.evaluationsChanged.emit(this.evaluations);
  }

  getEvaluations() {
    return this.evaluations.slice();
  }

  getEvaluationsSource() {
    let result = [];

    this.evaluations.forEach(evaluator => {
      if (!result.includes(evaluator.source)) {
        result.push(evaluator.source)
      }
    });

    return result;
  }

  getEvaluationsBySource(source: string) {
    let result: EvaluationModel[] = [];

    this.evaluations.forEach(evaluator => {
      if (evaluator.source === source) {
        result.push(evaluator)
      }
    });

    return result;
  }

}