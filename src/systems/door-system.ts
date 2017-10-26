import {
  CollisionEntity,
  InputEventData,
  CollisionEventData,
  ResolutionEventData,
} from "mu-engine";

import { DoorEvent } from "../events/door-event";

export function DoorSystem(entity: CollisionEntity): void {
  const _collisions: CollisionEntity[] = [];
  let _door = false;

  entity.on("keydown", (event: InputEventData): void => {
    switch (event.which) {
    case "ArrowUp":
    case "W":
    case "ArrowDown":
    case "S":
      _door = true;
      break;
    }
  });

  entity.on("collision", (event: ResolutionEventData) => {
    if (_door) {
      _collisions.push(event.target);
    }
  });

  entity.around("postcollision", (f: Function,
                                  _ev: CollisionEventData): boolean => {
    let rval = false;

    if (!f() && _door) {
      const ev = new DoorEvent()

      for (let e of _collisions) {
        if (e.send("door", ev)) {
          break;
        }
      }

      if (ev.target != null && entity.parent !== undefined) {
        rval = entity.parent.send("door", ev);
      }
    }

    _collisions.length = 0;
    _door = false;

    return rval;
  });
}
