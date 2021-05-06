import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from 'src/app/request.service';
import { EvaluationModel } from 'src/app/shared/evaluation.model';

@Component({
  selector: 'app-evaluation-closeness',
  templateUrl: './evaluation-closeness.component.html',
  styleUrls: ['./evaluation-closeness.component.css']
})
export class EvaluationClosenessComponent implements OnInit {

  evaluation: EvaluationModel;

  @Input() tableName: string;

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.evaluation = this.requestService.getEvaluationsBySource(this.tableName, 'closeness')[0];
    this.requestService.evaluationsChanged.subscribe((evaluations: EvaluationModel[]) => {
      this.evaluation = this.requestService.getEvaluationsBySource(this.tableName, 'closeness')[0];
    });
  }
}
