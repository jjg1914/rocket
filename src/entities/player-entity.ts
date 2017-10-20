import {
  PositionData,
  PositionComponent,
  MovementData,
  MovementComponent,
  RenderData,
  RenderComponent,
  AnimationData,
  AnimationComponent,
  AccelData,
  AccelComponent,
  CollisionData,
  CollisionComponent,
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
  collision: Partial<CollisionData>;
  accel: Partial<AccelData>;
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
  collision: CollisionData;
  accel: AccelData;
  control: { xAccel: number, jumpSpeed: number, jumpCutoff: number };

  constructor(config: Partial<PlayerConfig>) {
    super();

    this.position = new PositionComponent(Object.assign({
      width: 12,
      height: 14,
    }, config.position));

    this.accel= new AccelComponent(Object.assign({
      drag: 96,
    }, config.accel));

    this.movement = new MovementComponent(Object.assign({
      restrict: [ 0, null ],
      xMax: 64,
      yMax: 224,
    }, config.movement));

    this.collision = new CollisionComponent(config.collision);

    this.render = new RenderComponent(Object.assign({
      transform: [ 1, 0, -2, 0, 1, -2 ],
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
