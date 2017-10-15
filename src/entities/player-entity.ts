import {
  PositionData,
  PositionComponent,
  MovementData,
  MovementComponent,
  RenderData,
  RenderComponent,
  AnimationData,
  AnimationComponent,
  CollisionSystem,
  MoveSystem,
  Control2WaySystem,
  AccelSystem,
  RenderSystem,
  AnimationSystem,
  BaseEntity,
} from "mu-engine";

import { GrabData, GrabComponent } from "../components/grab-component";
import { StatsData, StatsComponent } from "../components/stats-component";
import { GrabSystem } from "../systems/grab-system";
import { DieSystem } from "../systems/die-system";

export interface PlayerConfig {
  position: Partial<PositionData>;
  render: Partial<RenderData>;
  animation: Partial<AnimationData>;
  movement: Partial<MovementData>;
  grab: Partial<GrabData>;
  stats: Partial<StatsData>
}

export class PlayerEntity extends BaseEntity {
  position: PositionData;
  render: RenderData;
  animation: AnimationData;
  movement: MovementData;
  grab: GrabData;
  stats: StatsData;
  control: { xAccel: number, jumpSpeed: number, jumpCutoff: number };

  constructor(config: Partial<PlayerConfig>) {
    super();

    this.position = new PositionComponent(Object.assign({
      width: 16,
      height: 16,
    }, config.position));

    this.movement = new MovementComponent(Object.assign({
      restrict: [ 0, null ],
      xMax: 64,
      yMax: 224,
      drag: 96,
    }, config.movement));

    this.render = new RenderComponent(Object.assign({
      sprite: "player.json",
      spriteFrame: 0,
      depth: 1,
    }, config.render));

    this.animation = new AnimationComponent(Object.assign({
      tag: "stand-right",
    }, config.render));

    this.grab = new GrabComponent(config.grab);

    this.stats = new StatsComponent(Object.assign({
      hitPoints: 5,
      hitPointsMax: 5,
    }, config.stats));

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
    CollisionSystem(this);
    AnimationSystem(this);
    RenderSystem(this);
  }
}
