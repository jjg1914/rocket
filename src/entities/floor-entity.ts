import {
  PositionData,
  PositionComponent,
  RenderData,
  RenderComponent,
  CollisionSystem,
  RenderSystem,
  BaseEntity,
} from "mu-engine";

export interface FloorConfig {
  position: Partial<PositionData>;
  render: Partial<RenderData>;
}

export class FloorEntity extends BaseEntity {
  position: PositionData;
  render: RenderData;

  constructor(config: Partial<FloorConfig>) {
    super();

    this.position = new PositionComponent(Object.assign({
      solid: true,
    }, config.position));
    this.render = new RenderComponent(Object.assign({
      fill: "#000000",
    }, config.render));

    CollisionSystem(this);
    RenderSystem(this);
  }
}
