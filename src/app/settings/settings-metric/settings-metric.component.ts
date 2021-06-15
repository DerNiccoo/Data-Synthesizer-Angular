import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-settings-metric',
  templateUrl: './settings-metric.component.html',
  styleUrls: ['./settings-metric.component.css']
})
export class SettingsMetricComponent implements OnInit {
  metrics: string [] = ['anonymity', 'sdveval', 'closeness', 'similarity', 'wasserstein', 'backgroundanonymity']
  sdvq: string [] = ['CSTest', 'KSTest', 'BNLikelihood', 'BNLogLikelihood', 'GMLogLikelihood', 'LogisticDetection', 'SVCDetection']
  metricForm = new FormControl();
  
  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
  }

  onSelectionChange(event) {
    let evaluators = { };
    let tests: string[] = [];

    event.value.forEach(metric => {
      if (this.sdvq.includes(metric)) {
        tests.push(metric);
      } else {
        evaluators[metric] = {'config': {}};
      }
    });

    if (tests.length > 0) {
      evaluators['SDVQ'] = {'config': {'tests': tests.join()}};
    }

    this.requestService.setEvaluators(evaluators);
  }
}
