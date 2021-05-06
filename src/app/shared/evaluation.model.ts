export class EvaluationModel {
  public type: string;
  public source: string;
  public metric: string;
  public name: string;
  public result;
}

export class EvaluationContainer {
  public name: string;
  public evaluations: EvaluationModel[];
}