import {
  PositionData,
  PositionComponent,
  MovementData,
  MovementComponent,
  RenderData,
  RenderComponent,
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
}

export class FallingPlatformEntity extends BaseEntity {
  position: PositionData;
  render: RenderData;
  movement: MovementData;

  constructor(config: Partial<FloorConfig>) {
    super();

    this.position = new PositionComponent(Object.assign({
      solid: [ null, 1 ],
    }, config.position));
    this.movement = new MovementComponent(Object.assign({
      friction: 128,
      nogravity: true,
    }, config.movement));
    this.render = new RenderComponent(Object.assign({
      fill: "#0000FF",
    }, config.render));

    AccelSystem(this);
    MoveSystem(this);
    CollisionSystem(this);
    FallingSystem(this);
    RenderSystem(this);
  }
}
