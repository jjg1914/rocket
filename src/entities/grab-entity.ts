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
  mixin,
} from "mu-engine";

import { GrabPickupSystem } from "../systems/grab-pickup-system";

export interface GrabConfig {
  position: PositionData;
  render: RenderData;
  movement: MovementData;
}

export const GrabEntity = mixin([
  RenderSystem,
  GrabPickupSystem,
  CollisionSystem,
  MoveSystem,
  AccelSystem,
], class extends BaseEntity {
  position: PositionData;
  render: RenderData;
  movement: MovementData;

  constructor(config: GrabConfig) {
    super();

    this.position = new PositionComponent(config.position);
    this.movement = new MovementComponent(config.movement);
    this.render = new RenderComponent(Object.assign({
      fill: "#FF0000",
    }, config.render));
  }
});
