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

    this.position = new PositionComponent({});

    this.render = new RenderComponent({
      children: [
        { fill: "#FF0000" },
      ],
    });

    RenderSystem(this);
  }
}
