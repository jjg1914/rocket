export interface TargetData {
  tag: string;
}

export class TargetComponent implements TargetData {
  tag: string;

  constructor(config?: Partial<TargetData>) {
    Object.assign(this, { tag: "" }, config);
  }
}
