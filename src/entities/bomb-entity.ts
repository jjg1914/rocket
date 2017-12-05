import { merge } from "lodash";

import {
  SimpleEntityConfig,
  SimpleEntity,
  Circle,
  AccelSystem,
  MoveSystem,
  EntityAddEvent,
  EntityDestroyEvent,
  AnimationData,
  AnimationComponent,
  AnimationSystem,
  // ResolutionEvent,
} from "mu-engine";

import { ExplosionEntity } from "./explosion-entity";

export class BombEntity extends SimpleEntity {
  animation: AnimationData;

  constructor(config: Partial<SimpleEntityConfig>) {
    super(merge({
      render: { sprite: "bomb.json", transform: [ 1, 0, -2, 0, 1, -2 ] },
      accel: { yMax: [ NaN, 128 ], nogravity: true },
      movement: { ySpeed: 96 },
      position: { width: 8, height: 8, mask: new Circle(4, 0, 0) },
    }, config));

    this.animation = new AnimationComponent({
      tag: "default",
    });

    setTimeout(() => {
      this.accel.nogravity = false;
    }, 200);

    AccelSystem(this);
    MoveSystem(this);

    AnimationSystem(this);

    this.on("bump", () => {
      if (this.parent !== undefined) {
        const ex = ExplosionEntity.explosion1(this.position.x - 10,
                                              this.position.y - 10,
                                              "player");
        this.parent.send("put", new EntityAddEvent("put", ex));
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
