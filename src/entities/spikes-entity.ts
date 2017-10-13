import {
  PositionData,
  PositionComponent,
  RenderData,
  RenderComponent,
  CollisionSystem,
  RenderSystem,
  BaseEntity,
  ResolutionEvent,
} from "mu-engine";

export interface SpikesConfig {
  position: Partial<PositionData>;
  render: Partial<RenderData>;
}

export class SpikesEntity extends BaseEntity {
  position: PositionData;
  render: RenderData;

  constructor(config: Partial<SpikesConfig>) {
    super();

    this.position = new PositionComponent(config.position);
    this.render = new RenderComponent(Object.assign({
      sprite: "spikes.json",
      spriteFrame: 0,
    }, config.render));

    this.on("collision", (ev: ResolutionEvent) => {
      ev.target.send("die");
    });

    CollisionSystem(this);
    RenderSystem(this);
  }
}
