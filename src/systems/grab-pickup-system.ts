import {
  Constructor,
  CollisionEntity,
} from "mu-engine";

import { GrabEventData } from "../systems/grab-system";

export function GrabPickupSystem(klass: Constructor<CollisionEntity>)
: Constructor<CollisionEntity> {
  return class extends klass {
    constructor(...args: any[]) {
      super(...args);

      this.on("grab", (event: GrabEventData) => {
        event.target.grab.target = this;
        event.target.grab.mode = "pickup";
        return true;
      });
    }
  }
};
