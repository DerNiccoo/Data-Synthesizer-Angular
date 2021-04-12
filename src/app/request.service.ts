import { EventEmitter, Injectable } from "@angular/core";
import { Attribute, Request, Table } from './shared/request.model';

@Injectable({providedIn: 'root'})
export class RequestService {
  requestChanged = new EventEmitter<Request>();
  tableSelected = new EventEmitter<Table>();

  private requestModel: Request = new Request();

  getRequest() {
    return this.requestModel;
  }

  setPath(path: string) {
    this.requestModel.path = path
  }

  setTable(name: string, attributes: Attribute[], model: string = 'TVAE') {
    this.requestModel.tables.push(new Table(name, model, attributes))
  }

}