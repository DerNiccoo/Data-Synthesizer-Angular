import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-settings-generator',
  templateUrl: './settings-generator.component.html',
  styleUrls: ['./settings-generator.component.css']
})
export class SettingsGeneratorComponent implements OnInit {
  elements: string [] = ['GaussianCopula', 'TVAE', 'CTGAN', 'CopulaGAN', 'Statistical']
  form = new FormControl();

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
  }

  onSelectionChange(event) {
    this.requestService.setGenerator(event.value);
  }
}
