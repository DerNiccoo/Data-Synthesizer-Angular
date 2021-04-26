import { Component, OnInit } from '@angular/core';
import { RequestService } from './request.service';
import { Attribute, Request, Table } from './shared/request.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  requestBody: Request = new Request();

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
  }
}
