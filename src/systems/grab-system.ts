import {
  Keys,
  shapeFor,
  Entity,
  PositionData,
  InputEventData,
  ResolutionEventData,
  CollisionEntity,
} from "mu-engine";

import { GrabData } from "../components/grab-component";

export interface GrabEntity extends Entity {
  position: PositionData;
  grab: GrabData;
}

export interface GrabEventData {
  type: "grab";
  target: GrabEntity;
}

export class GrabEvent implements GrabEventData {
  type: "grab";
  target: GrabEntity;

  constructor(target: GrabEntity) {
    this.type = "grab";
    this.target = target;
  }
}

export function GrabSystem(entity: GrabEntity): void {
  const _collisions: CollisionEntity[] = [];
  let _grab = false;

  entity.on("keydown", (event: InputEventData) => {
    if (event.which === Keys.ARROW_DOWN) {
      if (entity.grab.target == null) {
        _grab = true;
      } else {
        entity.grab.target.position.ignoreSolid = false;
        entity.grab.target = null;
        entity.grab.mode = null;
      }
    }
  });

  entity.on("collision", (event: ResolutionEventData) => {
    if (_grab) {
      _collisions.push(event.target);
    }
  });

  entity.on("postcollision", () => {
    _grab = false;

    for (let e of _collisions) {
      if (e.send("grab", new GrabEvent(entity))) {
        break;
      }
    }

    _collisions.length = 0;

    if (entity.grab.target != null) {
      const b = shapeFor(entity).bounds();
      const c = shapeFor(entity.grab.target).bounds();

      entity.grab.target.position.x = ((b.right + b.left) / 2) - ((c.right - c.left) / 2);
      entity.grab.target.position.y = b.top - (c.bottom - c.top + 1);
      entity.grab.target.position.ignoreSolid = true;
      entity.grab.target.position.landing = null;
      if (entity.grab.target.movement != null) {
        entity.grab.target.movement.ySpeed = 0;
      }
    }
  });
}
