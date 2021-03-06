import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from 'src/app/request.service';
import { EvaluationModel } from 'src/app/shared/evaluation.model';

@Component({
  selector: 'app-evaluation-similarity',
  templateUrl: './evaluation-similarity.component.html',
  styleUrls: ['./evaluation-similarity.component.css']
})
export class EvaluationSimilarityComponent implements OnInit {
  evaluation: EvaluationModel;

  @Input() tableName: string;

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.evaluation = this.requestService.getEvaluationsBySource(this.tableName, 'similarity')[0];
    this.requestService.evaluationsChanged.subscribe((evaluations: EvaluationModel[]) => {
      this.evaluation = this.requestService.getEvaluationsBySource(this.tableName, 'similarity')[0];
    });
  }

}
