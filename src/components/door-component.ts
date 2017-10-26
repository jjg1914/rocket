export interface DoorData {
  stage: string;
  x: number;
  y: number;
}

export class DoorComponent implements DoorData {
  stage: string;
  x: number;
  y: number;

  constructor(options?: Partial<DoorData>) {
    Object.assign(this, {
      stage: "",
      x: 0,
      y: 0,
    }, options);
  }
}
