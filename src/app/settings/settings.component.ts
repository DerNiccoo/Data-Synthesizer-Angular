import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { interval, Subscription } from 'rxjs';
import { RequestService } from '../request.service';
import { EvaluationContainer, EvaluationModel } from '../shared/evaluation.model';
import { Request, Table } from '../shared/request.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  requestBody: Request;
  isLoading: boolean = false;
  errorMsg: String = null;
  epochNumber: number = 300;
  dataAmount: number = 1;
  dataFactor: number = 1;

  loadedModel: boolean = false;

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
    this.loadedModel = this.requestService.getLoadedModel();
    this.requestService.requestChanged.subscribe((requestBody: Request) => {
      this.requestBody = requestBody;
      this.loadedModel = this.requestService.getLoadedModel();
    });
  }

  removeNonEnabled() {
    let request = new Request();
    request.path = this.requestBody.path;
    request.tables = [];
    request.evaluators = this.requestBody.evaluators;
    request.dataAmount = this.dataAmount;
    request.dataFactor = this.dataFactor;
    request.epoch = this.epochNumber;

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
    this.errorMsg = null;

    this.currentPhase = "1. Generieren von neuen Daten.";
    this.currentTipp = this.loadingTipps[Math.floor(Math.random() * this.loadingTipps.length)];

    /*this.subscription = interval(5000).subscribe(count => {
      this.currentTipp = this.loadingTipps[Math.floor(Math.random() * this.loadingTipps.length)];
    });*/
    
    console.log(request);

    this.isLoading = true;
    this.http
      .post(environment.baseUrl + '/training/', request)
      .subscribe((responseData) => {
        this.currentPhase = "2. Evaluieren der neuen Daten."

        this.http
          .post(environment.baseUrl + '/evaluate/', responseData)
          .subscribe((evaluationData: EvaluationContainer[]) => {
            console.log('Evaluation result:');
            console.log(evaluationData);
            this.requestService.setEvaluations(evaluationData);
            this.isLoading = false;
            //this.subscription.unsubscribe();
          },
          (error) => {
            this.isLoading = false;
            this.errorMsg = error.error.detail;
          })
      },
      (error) => {
        this.isLoading = false;
        this.errorMsg = error.error.detail;
      });    
  }

  onTestAll() {
    const request = this.removeNonEnabled();
    this.errorMsg = null;

    this.currentPhase = "1. Testen von allen Datensets in dem Ordner.";
    this.currentTipp = this.loadingTipps[Math.floor(Math.random() * this.loadingTipps.length)];

    this.subscription = interval(5000).subscribe(count => {
      this.currentTipp = this.loadingTipps[Math.floor(Math.random() * this.loadingTipps.length)];
    });
    

    this.isLoading = true;
    this.http
      .post(environment.baseUrl + '/evaluate/all', request)
      .subscribe((evaluationData: EvaluationContainer[]) => {
        this.requestService.setEvaluations(evaluationData);
        this.isLoading = false;
        this.subscription.unsubscribe();
      },
      (error) => {
        this.isLoading = false;
        this.errorMsg = error.error.detail;
      });       
  }

  onDebug() {
    const request = this.removeNonEnabled();
    this.errorMsg = null;

    this.currentPhase = "1. Debuggen aller möglichen Kombinationen. ACHTUNG: DAUERT!!!!";
    this.currentTipp = this.loadingTipps[Math.floor(Math.random() * this.loadingTipps.length)];

    this.subscription = interval(5000).subscribe(count => {
      this.currentTipp = this.loadingTipps[Math.floor(Math.random() * this.loadingTipps.length)];
    });
    
    this.isLoading = true;
    this.http
      .post(environment.baseUrl + '/debug', request)
      .subscribe((evaluationData: EvaluationContainer[]) => {
        this.requestService.setEvaluations(evaluationData);
        this.isLoading = false;
        this.subscription.unsubscribe();
      },
      (error) => {
        this.isLoading = false;
        this.errorMsg = error.error.detail;
      });       
  }

  onLoadedModel() {
    const request = this.removeNonEnabled();
    this.errorMsg = null;

    this.currentPhase = "1. Generieren von <b>weiteren</b> Daten.";
    this.currentTipp = this.loadingTipps[Math.floor(Math.random() * this.loadingTipps.length)];

    const headers = new HttpHeaders();
    const params = new HttpParams().append('path', this.requestService.getLoadedPath()).append('amount', '' + request.dataAmount);

    this.http
      .get(environment.baseUrl + '/loadedModel/' + this.requestService.getLoadedPath() + '/' + request.dataAmount)
      .subscribe((responseData) => {
        console.log(responseData);
      },
      (error) => {
        this.isLoading = false;
        this.errorMsg = error.error.detail;
      });  
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEpochChange(event: MatSliderChange) {
    this.epochNumber = event.value;
  }
 
  onAmountChange(event: MatSliderChange) {
    this.dataAmount = event.value;
  }

  onFactorChange(event: MatSliderChange) {
    this.dataFactor = event.value;
  }
}
