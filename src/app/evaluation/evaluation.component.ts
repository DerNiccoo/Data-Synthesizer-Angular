import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { EvaluationContainer, EvaluationModel } from '../shared/evaluation.model';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  evaluations: EvaluationContainer[];
  evaluationsSources: string[];

  @Input() tableName: string;

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.evaluations = this.requestService.getEvaluations();
    this.evaluationsSources = this.requestService.getEvaluationsSource(this.tableName);
    this.requestService.evaluationsChanged.subscribe(
      (evaluations: EvaluationContainer[]) => {
        this.evaluations = evaluations;
        this.evaluationsSources = this.requestService.getEvaluationsSource(this.tableName);
      }
    );
  }

}
