import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RequestService } from 'src/app/request.service';
import { EvaluationContainer } from 'src/app/shared/evaluation.model';

@Component({
  selector: 'app-evaluation-overview',
  templateUrl: './evaluation-overview.component.html',
  styleUrls: ['./evaluation-overview.component.css']
})
export class EvaluationOverviewComponent implements OnInit {
  evaluations: EvaluationContainer[];
  wasserstein;

  @Input() tableName: string;

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.evaluations = this.requestService.getEvaluations();
    this.requestService.evaluationsChanged.subscribe((evaluations: EvaluationContainer[]) => {
      this.evaluations = evaluations;
      this.set_values();
    });

    this.set_values();
    console.log(this.evaluations);
  }

  set_values() {
    this.evaluations[0].evaluations.forEach(evalv => {
      if (evalv.metric === 'Wasserstein') {
        this.wasserstein = evalv.result['Score']
      }
    });    
  }

}
