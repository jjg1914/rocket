import {
  PositionData,
  PositionComponent,
  PathData,
  PathComponent,
  MovementData,
  MovementComponent,
  AccelData,
  AccelComponent,
  CollisionData,
  CollisionComponent,
  RenderData,
  RenderComponent,
  CollisionSystem,
  PathSystem,
  RenderSystem,
  BaseEntity,
} from "mu-engine";

export interface FloorConfig {
  position: Partial<PositionData>;
  movement: Partial<MovementData>;
  collision: Partial<CollisionData>;
  accel: Partial<AccelData>;
  path: Partial<PathData>;
  render: Partial<RenderData>;
}

export class PlatformEntity extends BaseEntity {
  position: PositionData;
  render: RenderData;
  movement: MovementData;
  collision: CollisionData;
  accel: AccelData;
  path: PathData;

  constructor(config: Partial<FloorConfig>) {
    super();

    this.position = new PositionComponent(Object.assign({
      solid: [ null, 1 ],
    }, config.position));

    this.accel= new AccelComponent(Object.assign({
      friction: 128,
    }, config.accel));

    this.movement = new MovementComponent({});

    this.collision = new CollisionComponent(config.collision);

    this.path = new PathComponent(Object.assign({
      repeat: true,
    }, config.path));

    this.render = new RenderComponent(config.render);

    PathSystem(this);
    CollisionSystem(this);
    RenderSystem(this);
  }
}
