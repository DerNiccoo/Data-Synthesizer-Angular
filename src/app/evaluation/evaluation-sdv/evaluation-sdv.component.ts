import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/request.service';
import { EvaluationModel } from 'src/app/shared/evaluation.model';

export interface SDVElement {
  name: string;
  raw_score: number;
  normalized_score: number;
  min_value: number;
  max_value: number;
  goal: string;
}

@Component({
  selector: 'app-evaluation-sdv',
  templateUrl: './evaluation-sdv.component.html',
  styleUrls: ['./evaluation-sdv.component.css']
})
export class EvaluationSdvComponent implements OnInit {
  evaluations: EvaluationModel[];

  displayedColumns: string[] = ['name', 'raw_score', 'normalized_score', 'min_value', 'max_value', 'goal'];
  dataSource;

  constructor(private requestService: RequestService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.evaluations = this.requestService.getEvaluationsBySource('sdv');
    this.requestService.evaluationsChanged.subscribe((evaluations: EvaluationModel[]) => {
      this.evaluations = evaluations;
      this.createTableData();
    });

    this.createTableData();
  }

  createTableData() {
    let table_data: SDVElement[] = [];

    this.evaluations.forEach(evaluation => {
      table_data.push({name: evaluation.name, raw_score: evaluation.result.raw_score, normalized_score: evaluation.result.normalized_score, min_value: evaluation.result.min_value, max_value: evaluation.result.max_value, goal: evaluation.result.goal})
    });

    this.dataSource = table_data;
    this.changeDetectorRefs.detectChanges();
  }

}
