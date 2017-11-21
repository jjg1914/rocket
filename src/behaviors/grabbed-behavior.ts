import {
  Behavior,
  BehaviorState,
  BehaviorOptions,
  CollisionEntity,
} from "mu-engine";

export class GrabbedBehavior implements Behavior {
  _grabbed: boolean;

  constructor(entity: CollisionEntity) {
    this._grabbed = false;

    entity.on("grabbed", () => {
      this._grabbed = true;

      if (entity.accel !== undefined) {
        entity.accel.restrict = false;
      }
    });
  }

  reset(): void {
    this._grabbed = false;
  }

  call(_options: BehaviorOptions): BehaviorState {
    if (this._grabbed) {
      return "success";
    } else {
      return "pending";
    }
  }
}
