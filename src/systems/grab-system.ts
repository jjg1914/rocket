import {
  Keys,
  shapeFor,
  Entity,
  PositionData,
  Constructor,
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

export function GrabSystem(klass: Constructor<GrabEntity>)
: Constructor<GrabEntity> {
  return class extends klass {
    constructor(...args: any[]) {
      super(...args);
      
      const _collisions: CollisionEntity[] = [];
      let _grab = false;

      this.on("keydown", (event: InputEventData) => {
        if (event.which === Keys.ARROW_DOWN) {
          if (this.grab.target == null) {
            _grab = true;
          } else {
            this.grab.target.position.ignoreSolid = false;
            this.grab.target = null;
            this.grab.mode = null;
          }
        }
      });

      this.on("collision", (event: ResolutionEventData) => {
        if (_grab) {
          _collisions.push(event.target);
        }
      });

      this.on("postcollision", () => {
        _grab = false;

        for (let e of _collisions) {
          if (e.send("grab", new GrabEvent(this))) {
            break;
          }
        }

        _collisions.length = 0;

        if (this.grab.target != null) {
          const b = shapeFor(this).bounds();
          const c = shapeFor(this.grab.target).bounds();

          this.grab.target.position.x = ((b.right + b.left) / 2) - ((c.right - c.left) / 2);
          this.grab.target.position.y = b.top - (c.bottom - c.top + 1);
          this.grab.target.position.ignoreSolid = true;
          this.grab.target.position.landing = null;
          if (this.grab.target.movement != null) {
            this.grab.target.movement.ySpeed = 0;
          }
        }
      });
    }
  }
}
