export class Request {
  public path: string;
  public tables: Table[];
  public evaluators; //TODO: Spinner fragen wie man hier in TS die Daten angibt 
  public epoch: number;
  public dataAmount: number;
  public dataFactor: number;

  constructor() {}
}

export class Table {
  public enabled: boolean;

  constructor(public name: string, public model: string, public attributes: Attribute[]) {}
}

export class Attribute {
  public field_anonymize: string;
  public field_transformer: string;
  public field_distribution: string;
  public enabled: boolean;

  constructor(public name: string, public dtype: string, public sensible: boolean) {}
}