import {
  Entity,
  PositionData,
  MovementData,
  CollisionData,
  ControlData,
  AccelData,
} from "mu-engine";
import { GrabData } from "../components/grab-component";

export type GrabEventType = "grab" | "ungrab";

export interface GrabEntity extends Entity {
  position: PositionData;
  grab: GrabData;
  movement: MovementData;
  accel: AccelData;
  collision: CollisionData;
  control: ControlData;
}

export interface GrabEventData {
  type: GrabEventType;
  target: GrabEntity;
}

export class GrabEvent implements GrabEventData {
  type: GrabEventType;
  target: GrabEntity;

  constructor(type: GrabEventType, target: GrabEntity) {
    this.type = type;
    this.target = target;
  }
}
