import {
  RenderData,
  RenderComponent,
  PositionData,
  PositionComponent,
  RenderSystem,
  BaseEntity,
} from "mu-engine";

export class HudEntity extends BaseEntity {
  render: RenderData;
  position: PositionData;

  constructor() {
    super();

    this.position = new PositionComponent({
      width: 192,
      height: 20,
    });

    this.render = new RenderComponent({
      children: [
        {
          sprite: "fruit.json",
          spriteFrame: 0,
          transform: [ 1, 0, 6, 0, 1, 2 ],
        },
      ],
    });

    RenderSystem(this);
  }
}
