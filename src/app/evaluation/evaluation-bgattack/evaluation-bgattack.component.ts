import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RequestService } from 'src/app/request.service';
import { EvaluationModel } from 'src/app/shared/evaluation.model';

export interface AnonymityElement {
  attribute: string;
  accuracy: number;
  count: number;
  total_accuracy: number;
  fields: string;
  risk_level: number;
  risk: string;
}

@Component({
  selector: 'app-evaluation-bgattack',
  templateUrl: './evaluation-bgattack.component.html',
  styleUrls: ['./evaluation-bgattack.component.css']
})
export class EvaluationBgattackComponent implements OnInit {

  evaluation: EvaluationModel;
  risk_level: string;

  @Input
  () tableName: string;

  displayedColumns: string[] = ['attribute', 'accuracy', 'count', 'total_accuracy', 'fields', 'risk_level', 'risk'];
  dataSource;

  constructor(private requestService: RequestService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.evaluation = this.requestService.getEvaluationsBySource(this.tableName, 'background_anonymity')[0];
    this.requestService.evaluationsChanged.subscribe((evaluations: EvaluationModel[]) => {
      this.evaluation = this.requestService.getEvaluationsBySource(this.tableName, 'background_anonymity')[0];
      this.createTableData();
    });

    this.createTableData();
  }

  createTableData() {
    let table_data: AnonymityElement[] = [];

    this.risk_level = String(this.evaluation.result.risk.high) + '/' + String(this.evaluation.result.risk.medium) + '/' + String(this.evaluation.result.risk.low); 
    
    this.evaluation.result.attributes.forEach(attr => {
      table_data.push({ 
        attribute: attr.name,
        accuracy: +attr.accuracy.toFixed(3),
        count: attr.count,
        total_accuracy: +attr.total_accuracy.toFixed(3),
        fields: attr.fields,
        risk_level: +attr.risk_level.toFixed(3),
        risk: attr.risk
      });
    });
    console.log(table_data);
    this.dataSource = table_data;
    this.changeDetectorRefs.detectChanges();
  }

}
