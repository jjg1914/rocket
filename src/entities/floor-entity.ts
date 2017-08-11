import {
  PositionData,
  PositionComponent,
  RenderData,
  RenderComponent,
  CollisionSystem,
  RenderSystem,
  BaseEntity,
  mixin,
} from "mu-engine";

export interface FloorConfig {
  position: PositionData;
  render: RenderData;
}

export const FloorEntity = mixin([
  RenderSystem,
  CollisionSystem,
], class extends BaseEntity {
  position: PositionData;
  render: RenderData;

  constructor(config: FloorConfig) {
    super();

    this.position = new PositionComponent(Object.assign({
      solid: true,
    }, config.position));
    this.render = new RenderComponent(Object.assign({
      fill: "#000000",
    }, config.render));
  }
});
