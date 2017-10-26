import {
  BaseEntity,
  PositionData,
  PositionComponent,
  RenderData,
  RenderComponent,
  RenderSystem,
  Assets,
  Transform,
  Circle,
  InputEventData,
  EntityDefinition,
  EntityAddEvent,
  identity,
  translate,
} from "mu-engine";

import { StageEntity } from "./stage-entity";

export interface StageMenuConfig {
  assets: Assets;
  entities: { [ key: string ]: EntityDefinition }
}

export class StageMenuEntity extends BaseEntity {
  position: PositionData;
  render: RenderData;

  constructor(config: StageMenuConfig) {
    super();

    this.position = new PositionComponent({
      width: 192,
      height: 144,
    });

    this.render = new RenderComponent({
      fill: "#000000",
      children: [
        {
          transform: [ 1, 0, 8, 0, 1, 13],
          children: [
            {
              fill: "#FFFFFF",
              shape: new Circle(4, 0, 0),
              transform: [ 1, 0, 0, 0, 1, 0 ] as Transform,
            }
          ],
        },
        {
          transform: [ 1, 0, 16, 0, 1, 16],
          children: config.assets.stages().map((e, i) => {
            return {
              text: e,
              fill: "#FFFFFF",
              transform: [ 1, 0, 0, 0, 1, i * 16] as Transform,
            };
          }),
        },
      ]
    });

    let position = 0;

    this.on("keydown", (event: InputEventData) => {
      switch (event.which) {
      case "Enter":
      case " ":
        if (this.parent !== undefined) {
          this.parent.send("push", new EntityAddEvent("push", new StageEntity({
            assets: config.assets,
            stage: config.assets.stages()[position],
            entities: config.entities,
          }), { block: true }));
        }
        break;
      case "ArrowDown":
      case "S":
        position = Math.min(position + 1, config.assets.stages().length - 1);
        break;
      case "ArrowUp":
      case "W":
        position = Math.max(position - 1, 0);
        break;
      }

      if (this.render.children != undefined)  {
        const child1 = this.render.children[0];

        if (child1.children != undefined) {
          const transform = child1.children[0].transform;

          if (transform != undefined) {
            identity(transform);
            translate(transform, 0, position * 16);
          }
        }
      }
    });

    RenderSystem(this);
  }
}
