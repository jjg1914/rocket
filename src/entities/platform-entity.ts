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
  mixin,
} from "mu-engine";

export interface FloorConfig {
  position?: PositionData;
  movement?: MovementData;
  path?: PathData;
  render?: RenderData;
}

export const PlatformEntity = mixin([
  RenderSystem,
  CollisionSystem,
  PathSystem,
], class extends BaseEntity {
  position: PositionData;
  render: RenderData;
  movement: MovementData;
  path: PathData;

  constructor(config: FloorConfig) {
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
  }
});
