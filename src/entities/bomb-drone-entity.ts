import { merge } from "lodash";

import {
  //snap,
  BehaviorData,
  BehaviorComponent,
  BehaviorSystem,
  ControlData,
  ControlComponent,
  buildBehavior,
  EntityAddEvent,
  EntityDestroyEvent,
} from "mu-engine";

// import { MortarEntity } from "./mortar-entity";
import { GrabEntity, GrabConfig } from "./grab-entity";

import { TargetBehavior } from "../behaviors/target-behavior";
import { BombBehavior } from "../behaviors/bomb-behavior";
import { ChaseBehavior } from "../behaviors/chase-behavior";
import { GrabbedBehavior } from "../behaviors/grabbed-behavior";

import { ExplosionEntity } from "./explosion-entity";

export interface BombDroneConfig extends GrabConfig {
  ai: BehaviorData;
  control: ControlData;
}

export class BombDroneEntity extends GrabEntity {
  ai: BehaviorData;
  control: ControlData;

  constructor(config: Partial<BombDroneConfig>) {
    super(merge({
      render: {
        sprite: "bomb-drone.json",
        spriteFrame: 0,
      },
      accel: {
        nogravity: true,
      },
      movement: {
        xMax: 92,
        yMax: 64,
      },
      collision: {
        ignoreSolid: true,
      }
    }, config, {
      position: { width: 16, height: 16 },
    }));

    const targetBehavior = new TargetBehavior(this, {
      range: 128,
      yOffset: -48,
    });
    const bombBehavior = new BombBehavior(this, targetBehavior);
    const chaseBehavior = new ChaseBehavior(this, targetBehavior, {
      range: 8,
      yOffset: -48,
      xOffset: 24,
      xFlip: true,
    });

    this.ai = new BehaviorComponent({
      behavior: new GrabbedBehavior(this, buildBehavior({
        repeat: {
          select: [
            {
              sequence: [
                { leaf: targetBehavior },
                {
                  parallel: [
                    { phase: { leaf: bombBehavior }, params: { period: 1500 } },
                    { leaf: chaseBehavior },
                  ],
                },
              ],
            },
            { idle: undefined },
          ],
        },
      })),
    });

    this.control = new ControlComponent({
      xAccel: 256,
      yAccel: 256,
    });

    BehaviorSystem(this);

    this.on("ungrab", () => {
      this.collision.ignoreSolid = false;
    });

    this.on("bump", () => {
      if (this.parent !== undefined) {
        const ex = ExplosionEntity.explosion2(this.position.x,
                                              this.position.y + 4);
        this.parent.send("put", new EntityAddEvent("put", ex));
        this.parent.send("remove", new EntityDestroyEvent("remove", this));
      }
    });
  }
}
