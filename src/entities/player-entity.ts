import { merge } from "lodash";

import {
  AnimationData,
  AnimationComponent,
  ControlData,
  ControlComponent,
  Control2WaySystem,
  AnimationSystem,
  MoveSystem,
  AccelSystem,
  SimpleEntityConfig,
  SimpleEntity,
  LandingSystem,
  RestrictSystem,
  ResolutionEvent,
  EntityDestroyEvent,
} from "mu-engine";

import { GrabData, GrabComponent } from "../components/grab-component";
import { TargetData, TargetComponent } from "../components/target-component";
import { StatsData, StatsComponent } from "../components/stats-component";
import { GrabSystem } from "../systems/grab-system";
import { TargetSystem } from "../systems/target-system";
import { DoorSystem } from "../systems/door-system";
import { DieSystem } from "../systems/die-system";

import { LockEntity } from "./lock-entity";
import { KeyEntity } from "./key-entity";

export interface PlayerConfig extends SimpleEntityConfig {
  animation: Partial<AnimationData>;
  grab: Partial<GrabData>;
  stats: Partial<StatsData>
}

export class PlayerEntity extends SimpleEntity {
  animation: AnimationData;
  grab: GrabData;
  stats: StatsData;
  control: ControlData;
  target: TargetData;

  constructor(config: Partial<PlayerConfig>) {
    super(merge({
      position: { width: 12, height: 14 },
      accel: { drag: 96 },
      movement: { restrict: [ 0, NaN ], xMax: 64, yMax: [ -Infinity, 224 ] },
      render: {
        transform: [ 1, 0, -2, 0, 1, -2 ],
        sprite: "player.json",
        spriteFrame: 0,
        depth: 1,
      },
    }, config));

    this.animation = new AnimationComponent(merge({
      tag: "stand-right",
    }, config.animation));

    this.grab = new GrabComponent(config.grab);

    this.stats = new StatsComponent(merge({
      hitPoints: 5,
      hitPointsMax: 5,
    }, config.stats));

    this.control = new ControlComponent({
      xSpeed: 64,
      ySpeed: 64,
      xAccel: 192,
      jumpSpeed: 224,
      jumpCutoff: 100,
    });

    this.target = new TargetComponent({
      tag: "player",
    });

    this.on("start-right", () => {
      this.animation.tag = "walk-right";
    });

    this.on("start-left", () => {
      this.animation.tag = "walk-left";
    });

    this.on("stop-right", () => {
      this.animation.tag = "stand-right";
    });

    this.on("stop-left", () => {
      this.animation.tag = "stand-left";
    });

    this.on("bump", (ev: ResolutionEvent) => {
      if (ev.target instanceof LockEntity) {
        const lock = ev.target;

        if (this.grab.target instanceof KeyEntity) {
          const key = this.grab.target;

          if (lock.key.value == key.key.value) {
            if (lock.parent !== undefined) {
              lock.parent.send("remove", new EntityDestroyEvent("remove", lock));
            }

            if (key.parent !== undefined) {
              key.parent.send("remove", new EntityDestroyEvent("remove", key));
            }

            this.grab.target = null;
          }
        }
      }
    });

    DieSystem(this);

    AccelSystem(this);
    MoveSystem(this);
    LandingSystem(this);
    RestrictSystem(this);
    AnimationSystem(this);

    GrabSystem(this);
    DoorSystem(this);
    Control2WaySystem(this);

    TargetSystem(this);
  }
}
