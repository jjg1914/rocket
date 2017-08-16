import {
  shapeFor,
  InputEventData,
  ResolutionEventData,
  CollisionEntity,
} from "mu-engine";

import { GrabEntity, GrabEvent } from "../events/grab-event";

export function GrabSystem(entity: GrabEntity): void {
  const _collisions: CollisionEntity[] = [];
  let _grab = false;

  entity.on("keydown", (event: InputEventData): true | void => {
    switch (event.which) {
    case "Shift":
      if (entity.grab.target == null) {
        _grab = true;
      } else {
        switch (entity.grab.mode) {
        case "pickup":
          entity.grab.target.position.ignoreSolid = false;
          entity.grab.target = null;
          entity.grab.mode = null;
          break;
        case "fixed":
          entity.movement.xAccel = 0;
          entity.movement.xSpeed = 0;
          entity.movement.yAccel = 0;
          entity.movement.ySpeed = 0;
          entity.movement.nogravity = false;
          entity.grab.target = null;
          entity.grab.mode = null;
          break;
        }
      }
      break;
    case " ":
      if (entity.grab.target != null) {
        switch (entity.grab.mode) {
        case "fixed":
          entity.movement.nogravity = false;
          entity.position.landing = entity.grab.target;
          entity.grab.target = null;
          entity.grab.mode = null;
          break;
        }
      }
      break;
    case "ArrowLeft":
    case "ArrowRight":
    case "A":
    case "D":
      if (entity.grab.target != null) {
        switch (entity.grab.mode) {
        case "fixed":
          return true;
        }
      }
      break;
    }
  });

  entity.on("keyup", (event: InputEventData): true | void => {
    switch (event.which) {
    case "ArrowLeft":
    case "ArrowRight":
    case "A":
    case "D":
      if (entity.grab.target != null) {
        switch (entity.grab.mode) {
        case "fixed":
          return true;
        }
      }
      break;
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

      switch (entity.grab.mode) {
      case "pickup":
        entity.grab.target.position.x = ((b.right + b.left) / 2) - ((c.right - c.left) / 2);
        entity.grab.target.position.y = b.top - (c.bottom - c.top + 1);
        entity.grab.target.position.ignoreSolid = true;
        entity.grab.target.position.landing = null;
        if (entity.grab.target.movement != null) {
          entity.grab.target.movement.ySpeed = 0;
        }

        break;
      case "fixed":
        entity.position.x = c.left;
        entity.position.y = c.top;
        entity.movement.nogravity = true;

        break;
      default:
        break;
      }

    }
  });
}
