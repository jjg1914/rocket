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
  collision: Partial<CollisionData>;
  accel: Partial<AccelData>;
}

export class GrabEntity extends BaseEntity {
  position: PositionData;
  render: RenderData;
  movement: MovementData;
  collision: CollisionData;
  accel: AccelData;

  constructor(config: Partial<GrabConfig>) {
    super();

    this.position = new PositionComponent(config.position);

    this.accel= new AccelComponent(Object.assign({
      nogravity: _nogravityForMode(config.grabable),
      drag: 96,
    }, config.accel));

    this.movement = new MovementComponent(config.movement);

    this.collision = new CollisionComponent(config.collision);

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
