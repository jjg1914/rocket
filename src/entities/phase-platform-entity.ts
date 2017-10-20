import {
  PositionData,
  PositionComponent,
  MovementData,
  MovementComponent,
  AccelData,
  AccelComponent,
  CollisionData,
  CollisionComponent,
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
  collision: Partial<CollisionData>;
  accel: Partial<AccelData>;
  phase?: Partial<PhaseConfig>
}

export class PhasePlatformEntity extends BaseEntity {
  position: PositionData;
  render: RenderData;
  movement: MovementData;
  collision: CollisionData;
  accel: AccelData;

  constructor(config: Partial<PhasePlatformConfig>) {
    super();

    this.position = new PositionComponent(config.position);

    this.accel= new AccelComponent(Object.assign({
      nogravity: true,
      friction: 128,
    }, config.accel));

    this.movement = new MovementComponent(config.movement);

    this.collision = new CollisionComponent(Object.assign({
      solid: [ null, 1 ],
    }, config.collision));

    this.render = new RenderComponent( config.render);

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
