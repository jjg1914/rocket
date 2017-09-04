import { Entity, PositionData, MovementData } from "mu-engine";
import { GrabData } from "../components/grab-component";

export type GrabEventType = "grab";

export interface GrabEntity extends Entity {
  control: {
    xAccel: number,
  },
  position: PositionData;
  grab: GrabData;
  movement: MovementData;
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
