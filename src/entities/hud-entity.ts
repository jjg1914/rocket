import {
  RenderData,
  RenderComponent,
  RenderSystem,
  BaseEntity,
} from "mu-engine";

export class HudEntity extends BaseEntity {
  render: RenderData;

  constructor() {
    super();

    this.render = new RenderComponent({
      children: [
        {
          stroke: null,
          fill: "#FF0000",
          depth: 0,
          transform: [ 1, 0, 0, 0, 1, 0],
          children: [],
        },
      ],
    });

    RenderSystem(this);
  }
}
