import {
  Entity,
  MovementData,
  PositionData,
  InputEventData,
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
    entity.position.ignoreSolid = true;
    entity.movement.ySpeed = -160;
    _die = true;
  });

  entity.before("keydown", () => _die);
  entity.before("keyup", () => _die);
}
