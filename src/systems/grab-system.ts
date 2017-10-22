import {
  shapeFor,
  InputEventData,
  ResolutionEventData,
  CollisionEntity,
  Collision,
} from "mu-engine";

import { GrabEntity, GrabEvent } from "../events/grab-event";

export function GrabSystem(entity: GrabEntity): void {
  const _collisions: CollisionEntity[] = [];
  let _grab = null as null | InputEventData;

  entity.on("keydown", (event: InputEventData): true | void => {
    switch (event.which) {
    case "ArrowUp":
    case "W":
    case "ArrowDown":
    case "S":
      if (entity.grab.target == null) {
        _grab = event;
      } else {
        switch (entity.grab.mode) {
        case "pickup":
          entity.grab.target.collision.ignoreSolid = false;
          entity.grab.target.collision.landing = undefined;
          if (entity.grab.target.movement != null) {
            entity.grab.target.movement.xSpeed = 2.33 * entity.movement.xSpeed;
            entity.grab.target.movement.ySpeed = -96;
          }
          entity.grab.target = null;
          entity.grab.mode = null;
          break;
        case "fixed":
          const _left = event.inputs["ArrowLeft"] || event.inputs["A"];
          const _right = event.inputs["ArrowRight"] || event.inputs["D"];

          if (_left && !_right) {
            entity.accel.xAccel = -entity.control.xAccel;
          } else if (_right && !_left) {
            entity.accel.xAccel = entity.control.xAccel;
          } else {
            entity.accel.xAccel = 0;
          }

          entity.movement.xSpeed = 0;
          entity.accel.yAccel = 0;
          entity.movement.ySpeed = 0;
          entity.accel.nogravity = false;
          entity.accel.nofriction = false;
          entity.grab.target = null;
          entity.grab.mode = null;
          break;
        case "ladder":
          const _up = event.inputs["ArrowUp"] || event.inputs["W"];
          const _down = event.inputs["ArrowDown"] || event.inputs["S"];

          entity.movement.ySpeed = _ladder(entity.control.ySpeed, 1, _up, _down);

          return true;
        }
      }
      break;
    case " ":
      if (entity.grab.target != null) {
        switch (entity.grab.mode) {
        case "fixed":
          const _left = event.inputs["ArrowLeft"] || event.inputs["A"];
          const _right = event.inputs["ArrowRight"] || event.inputs["D"];

          const max = entity.movement.xMax;
          if (max != null) {
            if (_left && !_right) {
              entity.accel.xAccel = -entity.control.xAccel;
              if (max instanceof Array) {
                entity.movement.xSpeed = max[0];
              } else {
                entity.movement.xSpeed = -max;
              }
            } else if (_right && !_left) {
              entity.accel.xAccel = entity.control.xAccel;
              if (max instanceof Array) {
                entity.movement.xSpeed = max[1];
              } else {
                entity.movement.xSpeed = max;
              }
            }
          }

          entity.accel.nogravity = false;
          entity.collision.landing = entity.grab.target;
          entity.grab.target = null;
          entity.grab.mode = null;
          break;
        case "ladder":
          entity.accel.nofriction = false;
          entity.accel.nogravity = false;
          entity.collision.landing = entity.grab.target;
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
        const _left = event.inputs["ArrowLeft"] || event.inputs["A"];
        const _right = event.inputs["ArrowRight"] || event.inputs["D"];

        switch (entity.grab.mode) {
        case "fixed":
          return true;
        case "ladder":
          entity.movement.xSpeed = _ladder(entity.control.xSpeed, 0.75, _left, _right);

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
        const _left = event.inputs["ArrowLeft"] || event.inputs["A"];
        const _right = event.inputs["ArrowRight"] || event.inputs["D"];

        switch (entity.grab.mode) {
        case "fixed":
          return true;
        case "ladder":
          entity.movement.xSpeed = _ladder(entity.control.xSpeed, 0.75, _left, _right);
        }
      }
      break;
    case "ArrowUp":
    case "W":
    case "ArrowDown":
    case "S":
      if (entity.grab.target != null) {
        const _up = event.inputs["ArrowUp"] || event.inputs["W"];
        const _down = event.inputs["ArrowDown"] || event.inputs["S"];

        switch (entity.grab.mode) {
        case "ladder":
          entity.movement.ySpeed = _ladder(entity.control.ySpeed, 1, _up, _down);

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
        entity.grab.target.collision.ignoreSolid = true;
        entity.grab.target.collision.landing = undefined;
        if (entity.grab.target.movement != null) {
          entity.grab.target.movement.ySpeed = 0;
        }

        break;
      case "fixed":
        entity.position.x = c.left;
        entity.position.y = c.top;
        entity.accel.nogravity = true;

        break;
      case "ladder":
        if (Collision.check(entity, entity.grab.target)) {
          entity.accel.nogravity = true;
          entity.accel.nofriction = true;

          if (_grab) {
            const _up = _grab.inputs["ArrowUp"] || _grab.inputs["W"];
            const _down = _grab.inputs["ArrowDown"] || _grab.inputs["S"];

            entity.movement.xSpeed = 0;
            entity.movement.ySpeed = _ladder(entity.control.ySpeed, 1, _up, _down);
          }
        } else {
          entity.accel.yAccel = 0;
          entity.movement.ySpeed = 0;
          entity.accel.nogravity = false;
          entity.accel.nofriction = false;
          entity.grab.target = null;
          entity.grab.mode = null;
        }
        
        break;
      default:
        break;
      }
    }

    _grab = null;
  });
}

function _ladder(max: number | undefined,
                adjust: number,
                left?: boolean | null,
                right?: boolean | null)
: number {
  let rval = 0;

  if (max != null) {
    if (left) {
      rval -= max * adjust;
    }

    if (right) {
      rval += max * adjust;
    }
  }

  return rval;
}
