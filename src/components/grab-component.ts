import { CollisionEntity } from "mu-engine";

export type GrabType = "pickup" | "fixed" | "ladder";

export interface GrabData {
  mode: GrabType | null;
  target: CollisionEntity | null;
}

export class GrabComponent implements GrabData {
  mode: GrabType | null;
  target: CollisionEntity | null;

  constructor(...options: (Partial<GrabData> | undefined)[]) {
    Object.assign(this, {
      mode: null,
      target: null,
    }, ...options);
  }
}
