import {
  PositionData,
  PositionComponent,
  MovementData,
  MovementComponent,
  RenderData,
  RenderComponent,
  CollisionSystem,
  MoveSystem,
  AccelSystem,
  RenderSystem,
  BaseEntity,
} from "mu-engine";

import { GrabPickupSystem } from "../systems/grab-pickup-system";

export interface GrabConfig {
  position: Partial<PositionData>;
  render: Partial<RenderData>;
  movement: Partial<MovementData>;
}

export class GrabEntity extends BaseEntity {
  position: PositionData;
  render: RenderData;
  movement: MovementData;

  constructor(config: Partial<GrabConfig>) {
    super();

    this.position = new PositionComponent(config.position);
    this.movement = new MovementComponent(config.movement);
    this.render = new RenderComponent(Object.assign({
      fill: "#FF0000",
    }, config.render));

    GrabPickupSystem(this);
    RenderSystem(this);
    CollisionSystem(this);
    MoveSystem(this);
    AccelSystem(this);
  }
}
