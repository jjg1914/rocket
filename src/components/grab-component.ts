import { CollisionEntity } from "mu-engine";

export interface GrabData {
  mode: "pickup" | null;
  target: CollisionEntity | null;
}

export class GrabComponent implements GrabData {
  mode: "pickup" | null;
  target: CollisionEntity | null;

  constructor(options: Partial<GrabData> = {}) {
    Object.assign(this, {
      mode: null,
      target: null,
    }, options);
  }
}
