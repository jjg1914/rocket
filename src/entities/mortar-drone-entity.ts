import { merge } from "lodash";

import {
  //snap,
  EntityAddEvent,
} from "mu-engine";

import { MortarEntity } from "./mortar-entity";
import { GrabEntity, GrabConfig } from "./grab-entity";

export class MortarDroneEntity extends GrabEntity {
  constructor(config: Partial<GrabConfig>) {
    super(merge({
      render: {
        sprite: "mortar-drone.json",
        spriteFrame: 0,
      },
    }, config, {
      position: { width: 16, height: 16 },
    }));

    let dir = 1;
    const interval = setInterval(() => {
      if (this.parent !== undefined) {
        const mortar = new MortarEntity({
          position: {
            x: this.position.x + 4,
            y: this.position.y,
          },
        });
        mortar.movement.xSpeed *= dir;
        mortar.movement.ySpeed += this.movement.ySpeed;

        this.parent.send("put", new EntityAddEvent("put", mortar));
        dir *= -1;
      } else {
        clearInterval(interval);
      }
    }, 1500);
  }
}
