import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestService } from '../request.service';
import { Request } from '../shared/request.model';

@Component({
  selector: 'app-database-select',
  templateUrl: './database-select.component.html',
  styleUrls: ['./database-select.component.css'],
})
export class DatabaseSelectComponent implements OnInit {
  path: string = localStorage.getItem('db-path') || 'E:\\GitHub Repos\\Masterarbeit\\Datasets\\HRD.csv';
  errorMsg: String = null;

  constructor(
    private requestService: RequestService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.errorMsg = null;
    this.requestService.setRequest(new Request());

    if (this.path) {
      this.http.get('http://127.0.0.1:8000/schema/' + this.path).subscribe(
        (result) => {
          this.requestService.setRequest(result['metadata']);
          this.requestService.setSuggestions(result['suggestions']);
          this.requestService.setLoadedModel(false);
          localStorage.setItem('db-path', this.path.toString());
        },
        (error) => {
          this.errorMsg = error.error.detail;
        }
      );
    }
  }

  onLoad() {
    this.errorMsg = null;
    this.requestService.setRequest(new Request());

    if (this.path) {
      this.http.get('http://127.0.0.1:8000/load/' + this.path).subscribe(
        (result) => {
          this.requestService.setRequest(result['metadata']);
          this.requestService.setSuggestions(result['suggestions']);
          this.requestService.setLoadedPath(this.path);
          this.requestService.setLoadedModel(true);
          localStorage.setItem('db-path', this.path.toString());
        },
        (error) => {
          this.errorMsg = error.error.detail;
        }
      );
    }
  }

  onKill() {
    this.errorMsg = null;

    this.http.get('http://127.0.0.1:8001/reset').subscribe(
      (result) => {
        console.log("killed")
      },
      (error) => {
        this.errorMsg = error.error.detail;
      }
    );
  }
}
