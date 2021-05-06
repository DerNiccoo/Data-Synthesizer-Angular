import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RequestService } from 'src/app/request.service';
import { EvaluationModel } from 'src/app/shared/evaluation.model';

export interface AnonymityElement {
  attributes: string;
  identification_rate: number;
  identification_total: number;
  success_rate: number;
  weight: number;
}

@Component({
  selector: 'app-evaluation-anonymity',
  templateUrl: './evaluation-anonymity.component.html',
  styleUrls: ['./evaluation-anonymity.component.css']
})
export class EvaluationAnonymityComponent implements OnInit {

  evaluation: EvaluationModel;
  risk_level: string;

  @Input
  () tableName: string;

  displayedColumns: string[] = ['attributes', 'identification_rate', 'identification_total', 'success_rate', 'weight'];
  dataSource;

  constructor(private requestService: RequestService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.evaluation = this.requestService.getEvaluationsBySource(this.tableName, 'anonymity')[0];
    this.requestService.evaluationsChanged.subscribe((evaluations: EvaluationModel[]) => {
      this.evaluation = this.requestService.getEvaluationsBySource(this.tableName, 'anonymity')[0];
      this.createTableData();
    });

    this.createTableData();
  }

  createTableData() {
    let table_data: AnonymityElement[] = [];

    this.risk_level = this.evaluation.result.risk_level

    let sortedResults = this.evaluation.result.data.sort((a, b) => {
      if (a[2] == b[2]) {
        return b[3] - a[3]
      }
      return b[2] - a[2]
    })

    let limit = sortedResults.length > 15 ? 15 : sortedResults.length;    
    
    for (let index = 0; index < limit; index++) {
      table_data.push({attributes: sortedResults[index][1].join(', '), identification_rate: sortedResults[index][0], identification_total: sortedResults[index][2], success_rate: sortedResults[index][3], weight: sortedResults[index][4]})
    }

    this.dataSource = table_data;
    this.changeDetectorRefs.detectChanges();
  }

}
