import {
  AnimationData,
  AnimationComponent,
  Control2WaySystem,
  AnimationSystem,
  MoveSystem,
  AccelSystem,
  SimpleEntityConfig,
  SimpleEntity,
} from "mu-engine";

import { GrabData, GrabComponent } from "../components/grab-component";
import { StatsData, StatsComponent } from "../components/stats-component";
import { GrabSystem } from "../systems/grab-system";
import { DieSystem } from "../systems/die-system";

export interface PlayerConfig extends SimpleEntityConfig {
  animation: Partial<AnimationData>;
  grab: Partial<GrabData>;
  stats: Partial<StatsData>
}

export class PlayerEntity extends SimpleEntity {
  animation: AnimationData;
  grab: GrabData;
  stats: StatsData;
  control: { xAccel: number, jumpSpeed: number, jumpCutoff: number };

  constructor(config: Partial<PlayerConfig>) {
    super({
      position: { width: 12, height: 14 },
      accel: { drag: 96 },
      movement: { restrict: [ 0, null ], xMax: 64, yMax: 224 },
      render: {
        transform: [ 1, 0, -2, 0, 1, -2 ],
        sprite: "player.json",
        spriteFrame: 0,
        depth: 1,
      },
    }, config);

    this.animation = new AnimationComponent({
      tag: "stand-right",
    }, config.animation);

    this.grab = new GrabComponent(config.grab);

    this.stats = new StatsComponent({
      hitPoints: 5,
      hitPointsMax: 5,
    }, config.stats);

    this.control = {
      xAccel: 192,
      jumpSpeed: 224,
      jumpCutoff: 100,
    };

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

    DieSystem(this);
    GrabSystem(this);
    Control2WaySystem(this);

    AccelSystem(this);
    MoveSystem(this);
    AnimationSystem(this);
  }
}
