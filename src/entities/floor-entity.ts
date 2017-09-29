import {
  PositionData,
  PositionComponent,
  RenderData,
  RenderComponent,
  MovementData,
  MovementComponent,
  CollisionSystem,
  RenderSystem,
  BaseEntity,
} from "mu-engine";

export interface FloorConfig {
  position: Partial<PositionData>;
  render: Partial<RenderData>;
  movement: Partial<MovementData>;
}

export class FloorEntity extends BaseEntity {
  position: PositionData;
  render: RenderData;
  movement: MovementData;

  constructor(config: Partial<FloorConfig>) {
    super();

    this.position = new PositionComponent(Object.assign({
      solid: true,
    }, config.position));
    this.render = new RenderComponent(config.render);
    this.movement = new MovementComponent(Object.assign({
      friction: 128,
    }, config.movement));

    CollisionSystem(this);
    RenderSystem(this);
  }
}
