import {
  PositionData,
  PositionComponent,
  PathData,
  PathComponent,
  MovementData,
  MovementComponent,
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
  path: Partial<PathData>;
  render: Partial<RenderData>;
}

export class PlatformEntity extends BaseEntity {
  position: PositionData;
  render: RenderData;
  movement: MovementData;
  path: PathData;

  constructor(config: Partial<FloorConfig>) {
    super();

    this.position = new PositionComponent(Object.assign({
      solid: [ null, 1 ],
    }, config.position));
    this.movement = new MovementComponent(config.movement);
    this.path = new PathComponent(Object.assign({
      repeat: true,
    }, config.path));
    this.render = new RenderComponent(Object.assign({
      fill: "#0000FF",
    }, config.render));

    RenderSystem(this);
    CollisionSystem(this);
    PathSystem(this);
  }
}
