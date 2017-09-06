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

import { PhaseSystem, PhaseConfig } from "../systems/phase-system";

export interface PhasePlatformConfig {
  position: Partial<PositionData>;
  movement: Partial<MovementData>;
  render: Partial<RenderData>;
  phase?: Partial<PhaseConfig>
}

export class PhasePlatformEntity extends BaseEntity {
  position: PositionData;
  render: RenderData;
  movement: MovementData;

  constructor(config: Partial<PhasePlatformConfig>) {
    super();

    this.position = new PositionComponent(Object.assign({
      solid: [ null, 1 ],
    }, config.position));
    this.movement = new MovementComponent(Object.assign({
      nogravity: true,
      friction: 128,
    }, config.movement));
    this.render = new RenderComponent(Object.assign({
      fill: "#0000FF",
    }, config.render));

    AccelSystem(this);
    MoveSystem(this);
    CollisionSystem(this);
    PhaseSystem(this, Object.assign({
      on: 2000,
      off: 2000,
    }, config.phase));
    RenderSystem(this);
  }
}
