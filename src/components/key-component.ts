export interface KeyData {
  value: string;
}

export class KeyComponent implements KeyData {
  value: string;

  constructor(options?: Partial<KeyData>) {
    Object.assign(this, {
      value: ""
    }, options);
  }
}
