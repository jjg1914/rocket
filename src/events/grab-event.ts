import { Entity, PositionData } from "mu-engine";
import { GrabData } from "../components/grab-component";

export type GrabEventType = "grab";

export interface GrabEntity extends Entity {
  position: PositionData;
  grab: GrabData;
}

export interface GrabEventData {
  type: GrabEventType;
  target: GrabEntity;
}

export class GrabEvent implements GrabEventData {
  type: GrabEventType;
  target: GrabEntity;

  constructor(target: GrabEntity) {
    this.type = "grab";
    this.target = target;
  }
}