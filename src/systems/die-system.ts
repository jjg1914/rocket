import {
  Entity,
  MovementData,
  PositionData,
  InputEventData,
  AccelData,
  CollisionData,
  CollisionEventData,
} from "mu-engine";

import { DieEvent } from "../events/die-event";

export interface DieEntity extends Entity {
  position: PositionData,
  movement: MovementData;
  accel: AccelData;
  collision: CollisionData;
}

export function DieSystem(entity: DieEntity): void {
  let _die = false;

  entity.on("keydown", (event: InputEventData) => {
    if (event.which === "Escape") {
      entity.send("die", new DieEvent());
    }
  });

  entity.on("die", () => {
    if (!_die) {
      entity.collision.ignoreSolid = true;
      entity.movement.ySpeed = -160;
      entity.accel.yAccel= 0;
      entity.movement.xSpeed = 0;
      entity.accel.xAccel= 0;
      _die = true;
    }
  });

  entity.on("outofbounds", (ev: CollisionEventData) => {
    if (entity.position.y > ev.data.bounds().bottom) {
      entity.send("die", new DieEvent());
    }
  });

  entity.on("crush", () => {
    entity.send("die", new DieEvent());
  });

  entity.before("keydown", () => _die);
  entity.before("keyup", () => _die);
}
