import {
  Entity,
  MovementData,
  PositionData,
  InputEventData,
  CollisionEventData,
} from "mu-engine";

import { DieEvent } from "../events/die-event";

export interface DieEntity extends Entity {
  position: PositionData,
  movement: MovementData;
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
      entity.position.ignoreSolid = true;
      entity.movement.ySpeed = -160;
      entity.movement.yAccel= 0;
      entity.movement.xSpeed = 0;
      entity.movement.xAccel= 0;
      _die = true;
    }
  });

  entity.on("outofbounds", (ev: CollisionEventData) => {
    if (entity.position.y > ev.data.bounds().bottom) {
      entity.send("die", new DieEvent());
    }
  });

  entity.before("keydown", () => _die);
  entity.before("keyup", () => _die);
}
