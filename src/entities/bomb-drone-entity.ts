import { merge } from "lodash";

import {
  //snap,
  BehaviorData,
  BehaviorComponent,
  BehaviorSystem,
  ControlData,
  ControlComponent,
  buildBehavior,
} from "mu-engine";

// import { MortarEntity } from "./mortar-entity";
import { GrabEntity, GrabConfig } from "./grab-entity";

import { TargetBehavior } from "../behaviors/target-behavior";
import { BombBehavior } from "../behaviors/bomb-behavior";
import { ChaseBehavior } from "../behaviors/chase-behavior";
import { GrabbedBehavior } from "../behaviors/grabbed-behavior";

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
    }, config, {
      position: { width: 16, height: 16 },
    }));

    const grabbedBehavior = new GrabbedBehavior(this);
    const targetBehavior = new TargetBehavior(this, {
      range: 128,
      yOffset: -64,
    });
    const bombBehavior = new BombBehavior(this, targetBehavior);
    const chaseBehavior = new ChaseBehavior(this, targetBehavior, {
      range: 16,
      yOffset: -64,
    });

    this.ai = new BehaviorComponent({
      behavior: buildBehavior({
        parallel: [
          { leaf: grabbedBehavior },
          {
            repeat: {
              select: [
                {
                  sequence: [
                    { leaf: targetBehavior },
                    { leaf: bombBehavior },
                    { leaf: chaseBehavior },
                  ],
                },
                { idle: null },
              ],
            },
          },
        ],
      }),
    });

    this.control = new ControlComponent({
      xAccel: 256,
      yAccel: 256,
    });

    BehaviorSystem(this);
  }
}
