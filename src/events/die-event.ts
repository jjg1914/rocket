export type DieEventType = "die";

export interface DieEventData {
  type: DieEventType;
}

export class DieEvent implements DieEventData {
  type: DieEventType;

  constructor() {
    this.type = "die";
  }
}
