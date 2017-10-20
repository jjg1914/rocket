import {
  PositionData,
  PositionComponent,
  MovementData,
  MovementComponent,
  RenderData,
  RenderComponent,
  AccelData,
  AccelComponent,
  CollisionData,
  CollisionComponent,
  CollisionSystem,
  AccelSystem,
  MoveSystem,
  RenderSystem,
  BaseEntity,
} from "mu-engine";

import { FallingSystem } from "../systems/falling-system";

export interface FloorConfig {
  position: Partial<PositionData>;
  movement: Partial<MovementData>;
  render: Partial<RenderData>;
  collision: Partial<CollisionData>;
  accel: Partial<AccelData>;
}

export class FallingPlatformEntity extends BaseEntity {
  position: PositionData;
  render: RenderData;
  movement: MovementData;
  collision: CollisionData;
  accel: AccelData;

  constructor(config: Partial<FloorConfig>) {
    super();

    this.accel= new AccelComponent(Object.assign({
      friction: 224,
      yMax: 192,
      nogravity: true,
    }, config.accel));

    this.position = new PositionComponent(config.position);

    this.movement = new MovementComponent(config.movement);

    this.collision = new CollisionComponent(Object.assign({
      solid: [ null, 1 ],
    }, config.collision));

    this.render = new RenderComponent(Object.assign({
      sprite: "block.json",
      spriteFrame: 0,
    }, config.render));

    AccelSystem(this);
    MoveSystem(this);
    CollisionSystem(this);
    FallingSystem(this);
    RenderSystem(this);
  }
}
