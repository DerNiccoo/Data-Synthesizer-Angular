import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestService } from '../request.service';
import { Request } from '../shared/request.model';

@Component({
  selector: 'app-database-select',
  templateUrl: './database-select.component.html',
  styleUrls: ['./database-select.component.css']
})
export class DatabaseSelectComponent implements OnInit {
  path: String = 'E:\\GitHub Repos\\Privacy\\Datasets\\HRD.csv';
  errorMsg: String = null;

  constructor(private requestService: RequestService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMsg = null;    
    this.requestService.setRequest(new Request());

    if (this.path) {
      this.http.get('http://127.0.0.1:8000/schema/' + this.path).subscribe(
        (result) => {          
          this.requestService.setRequest(result['metadata']);
        }, error => {
          this.errorMsg = error.error.detail;
        }
      );
    }    
  }
}
