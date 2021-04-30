import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { RequestService } from '../request.service';
import { EvaluationModel } from '../shared/evaluation.model';
import { Request, Table } from '../shared/request.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  requestBody: Request;
  isLoading: boolean = false;

  private subscription: Subscription;
  currentTipp: string;
  currentPhase: string;
  loadingTipps: string[] = ['Durch das Ändern des Datentypens auf Categorical kann eine One-Hot Generierung des Attributes erzwungen werden.', 'Werden zu viele Attribute als Categorical interpretiert beeinflusst es stark die Ladezeit.', 'Soll eine eindeutige Nummer für ein Attribut erzeugt werden emfpiehlt sich der Datentyp ID.', 'Faker erlaubt die Erzeugung zufälliger Werte, dazu passende Art zum Attribute auswählen und 100% Sicherheit genießen.', 'Wird von einem Nummer-Attribute die echte Verteilung nicht automatisch erkannt, kann die Distribution geändert werden.', 'Keine guten Categorical Ergebnisse? Ändern des Transformers auf label_encoding kann helfen.', 'Das manuelle bestimmen des Identifer ist für eine genauere Sicherheitsbestimmung notwendig.']

  constructor(
    private requestService: RequestService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.requestBody = this.requestService.getRequest();
    this.requestService.requestChanged.subscribe((requestBody: Request) => {
      this.requestBody = requestBody;
    });
  }

  removeNonEnabled() {
    let request = new Request();
    request.path = this.requestBody.path;
    request.tables = [];
    request.evaluators = this.requestBody.evaluators;

    this.requestBody.tables.forEach((table) => {
      if (table.enabled) {
        let attributes = [];
        table.attributes.forEach((attribute) => {
          if (attribute.enabled) {
            attributes.push(attribute);
          }
        });

        request.tables.push(new Table(table.name, table.model, attributes));
      }
    });

    return request;
  }

  onRun() {
    const request = this.removeNonEnabled();

    this.currentPhase = "1. Generieren von neuen Daten.";
    this.currentTipp = this.loadingTipps[Math.floor(Math.random() * this.loadingTipps.length)];

    this.subscription = interval(5000).subscribe(count => {
      this.currentTipp = this.loadingTipps[Math.floor(Math.random() * this.loadingTipps.length)];
    });
    
    this.isLoading = true;
    this.http
      .post('http://127.0.0.1:8000/training/', request)
      .subscribe((responseData) => {
        this.currentPhase = "2. Evaluieren der neuen Daten."

        this.http
          .post('http://127.0.0.1:8000/evaluate/', responseData)
          .subscribe((evaluationData: EvaluationModel[]) => {
            this.requestService.setEvaluations(evaluationData);
            this.isLoading = false;
          })
      });    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
}
