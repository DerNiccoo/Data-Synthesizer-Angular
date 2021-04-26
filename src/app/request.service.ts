import { EventEmitter, Injectable } from "@angular/core";
import { Attribute, Request, Table } from './shared/request.model';

@Injectable({providedIn: 'root'})
export class RequestService {
  requestChanged = new EventEmitter<Request>();
  tableSelected = new EventEmitter<Table>();

  private requestModel: Request = new Request();

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

  setRequest(reqeustBody: Request) {
    this.requestModel = reqeustBody;
    this.requestChanged.emit(this.requestModel);
  }

  setPath(path: string) {
    this.requestModel.path = path
    this.requestChanged.emit(this.requestModel);
  }

  setTable(name: string, attributes: Attribute[], model: string = 'TVAE') {
    this.requestModel.tables.push(new Table(name, model, attributes))
  }

  setEvaluators(evaluators) {
    this.requestModel.evaluators = evaluators;
    this.requestChanged.emit(this.requestModel);
  }

}