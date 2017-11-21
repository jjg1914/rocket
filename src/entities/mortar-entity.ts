import { merge } from "lodash";

import {
  SimpleEntityConfig,
  SimpleEntity,
  Circle,
  AccelSystem,
  MoveSystem,
  EntityDestroyEvent,
  ResolutionEvent,
} from "mu-engine";

export class MortarEntity extends SimpleEntity {
  constructor(config: Partial<SimpleEntityConfig>) {
    super(merge({
      render: { sprite: "mortar.json" },
      accel: { nogravity: true, yMax: [ NaN, 128 ] },
      position: { width: 8, height: 8, mask: new Circle(4, 0, 0) },
      movement: { ySpeed: -128, xSpeed: 32 },
      collision: { ignoreSolid: true },
    }, config));

    AccelSystem(this);
    MoveSystem(this);

    setInterval(() => {
      this.accel.nogravity = false;
    }, 150)

    this.on("collision", (ev: ResolutionEvent) => {
      ev.target.send("die");
    });

    this.on("outofbounds", () => {
      if (this.parent !== undefined) {
        this.parent.send("remove", new EntityDestroyEvent("remove", this));
      }
    });
  }
}
