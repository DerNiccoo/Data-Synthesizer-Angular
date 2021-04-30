import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { EvaluationModel } from '../shared/evaluation.model';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  evaluations: EvaluationModel[];
  evaluationsSources: string[];

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.evaluations = this.requestService.getEvaluations();
    this.evaluationsSources = this.requestService.getEvaluationsSource();
    this.requestService.evaluationsChanged.subscribe(
      (evaluations: EvaluationModel[]) => {
        this.evaluations = evaluations;
        this.evaluationsSources = this.requestService.getEvaluationsSource();
      }
    );
  }

}
