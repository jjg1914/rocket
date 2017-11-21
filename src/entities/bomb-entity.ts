import { merge } from "lodash";

import {
  SimpleEntityConfig,
  SimpleEntity,
  Circle,
  AccelSystem,
  MoveSystem,
  EntityDestroyEvent,
  // ResolutionEvent,
} from "mu-engine";

export class BombEntity extends SimpleEntity {
  constructor(config: Partial<SimpleEntityConfig>) {
    super(merge({
      render: { sprite: "bomb.json" },
      accel: { yMax: [ NaN, 128 ] },
      position: { width: 8, height: 8, mask: new Circle(4, 0, 0) },
    }, config));

    AccelSystem(this);
    MoveSystem(this);

    /* 
    this.on("collision", (ev: ResolutionEvent) => {
      ev.target.send("die");
      if (this.parent !== undefined) {
        this.parent.send("remove", new EntityDestroyEvent("remove", this));
      }
    });
    */

    this.on("bump", () => {
      if (this.parent !== undefined) {
        this.parent.send("remove", new EntityDestroyEvent("remove", this));
      }
    });

    this.on("outofbounds", () => {
      if (this.parent !== undefined) {
        this.parent.send("remove", new EntityDestroyEvent("remove", this));
      }
    });
  }
}
