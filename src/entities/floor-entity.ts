import {
  PositionData,
  PositionComponent,
  RenderData,
  RenderComponent,
  AccelData,
  AccelComponent,
  CollisionData,
  CollisionComponent,
  CollisionSystem,
  RenderSystem,
  BaseEntity,
} from "mu-engine";

export interface FloorConfig {
  position: Partial<PositionData>;
  render: Partial<RenderData>;
  accel: Partial<AccelData>;
  collision: Partial<CollisionData>;
}

export class FloorEntity extends BaseEntity {
  position: PositionData;
  render: RenderData;
  accel: AccelData;
  collision: CollisionData;

  constructor(config: Partial<FloorConfig>) {
    super();

    this.position = new PositionComponent(config.position);

    this.accel = new AccelComponent(Object.assign({
      friction: 224,
    }, config.accel));

    this.collision = new CollisionComponent(Object.assign({
      solid: true,
    }, config.collision));

    this.render = new RenderComponent(config.render);

    CollisionSystem(this);
    RenderSystem(this);
  }
}
