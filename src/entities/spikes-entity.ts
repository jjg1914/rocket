import {
  PositionData,
  PositionComponent,
  RenderData,
  RenderComponent,
  CollisionData,
  CollisionComponent,
  CollisionSystem,
  RenderSystem,
  BaseEntity,
  ResolutionEvent,
} from "mu-engine";

export interface SpikesConfig {
  position: Partial<PositionData>;
  render: Partial<RenderData>;
  collision: Partial<CollisionData>;
}

export class SpikesEntity extends BaseEntity {
  position: PositionData;
  collision: CollisionData;
  render: RenderData;

  constructor(config: Partial<SpikesConfig>) {
    super();

    this.position = new PositionComponent(config.position);
    this.collision = new CollisionComponent(config.collision);
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
