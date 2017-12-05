import {
  Behavior,
  BehaviorState,
  BehaviorOptions,
  CollisionEntity,
} from "mu-engine";

export class GrabbedBehavior implements Behavior {
  private _grabbed: boolean;
  private _child: Behavior;

  constructor(entity: CollisionEntity, child: Behavior) {
    this._grabbed = false;
    this._child = child;

    entity.on("grabbed", () => {
      this._grabbed = true;

      if (entity.accel !== undefined) {
        entity.accel.restrict = false;
        entity.accel.xAccel = 0;
        entity.accel.yAccel = 0;
      }

      if (entity.movement !== undefined) {
        entity.movement.xSpeed = 0;
        entity.movement.ySpeed = 0;
      }
    });
  }

  reset(): void {
    this._grabbed = false;
  }

  call(options: BehaviorOptions): BehaviorState {
    if (this._grabbed) {
      return "success";
    } else {
      return this._child.call(options);
    }
  }
}
