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

import { GrabableSystem, GrabableConfig } from "../systems/grabable-system";

export interface GrabConfig {
  position: Partial<PositionData>;
  render: Partial<RenderData>;
  movement: Partial<MovementData>;
  grabable: Partial<GrabableConfig>;
}

export class GrabEntity extends BaseEntity {
  position: PositionData;
  render: RenderData;
  movement: MovementData;

  constructor(config: Partial<GrabConfig>) {
    super();

    this.position = new PositionComponent(config.position);
    this.movement = new MovementComponent(Object.assign({
      nogravity: _nogravityForMode(config.grabable),
      drag: 96,
    }, config.movement));
    this.render = new RenderComponent(Object.assign({
      fill: "#FF0000",
    }, config.render));


    GrabableSystem(this, Object.assign({
      mode: "pickup",
    }, config.grabable));

    AccelSystem(this);
    MoveSystem(this);
    CollisionSystem(this);
    RenderSystem(this);
  }
}

function _nogravityForMode(config?: Partial<GrabableConfig>): boolean {
  if (config != null) {
    switch (config.mode) {
    case "fixed":
      return true;
    default:
      return false;
    }
  } else {
    return false;
  }
}
