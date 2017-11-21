import {
  Entity,
  PositionData,
  MovementData,
  CollisionData,
  AccelData,
} from "mu-engine";

import { TargetData } from "../components/target-component";

export type TargetEventType = "target";

export interface TargetEventEntity extends Entity {
  target: TargetData;
  position: PositionData;
  movement: MovementData;
  accel: AccelData;
  collision: CollisionData;
}

export interface TargetEventData {
  type: TargetEventType;
  tags: string[];
  targets: TargetEventEntity[];
}

export class TargetEvent implements TargetEventData {
  type: TargetEventType;
  tags: string[];
  targets: TargetEventEntity[];

  constructor(tags: string | string[]) {
    this.type = "target";
    this.targets = [];

    if (tags instanceof Array) {
      this.tags = tags;
    } else {
      this.tags = [ tags ];
    }
  }
}
