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
          this.requestService.setSuggestions([
            {'id': 1, 'table': 'HRD', 'attribute': 'Employee_Name', 'category': 'Faker', 'solution': 'Name'},
            {'id': 2, 'table': 'HRD', 'attribute': 'EmpID', 'category': 'Datatype', 'solution': 'ID'},
            {'id': 3, 'table': 'HRD', 'attribute': 'MarriedID', 'category': 'Datatype', 'solution': 'ID'},
            {'id': 4, 'table': 'HRD', 'attribute': 'GenderID', 'category': 'Datatype', 'solution': 'ID'},
            {'id': 5, 'table': 'HRD', 'attribute': 'Zip', 'category': 'Faker', 'solution': 'Zip'},
            {'id': 6, 'table': 'HRD', 'attribute': 'ManagerName', 'category': 'Faker', 'solution': 'Name'},
          ]);
        }, error => {
          this.errorMsg = error.error.detail;
        }
      );
    }    
  }
}
