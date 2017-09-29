import {
  BaseEntity,
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
  render: RenderData;
constructor(config: StageMenuConfig) {
    super();

    this.render = new RenderComponent({
      children: [
        {
          stroke: null,
          fill: "#000000",
          depth: 0,
          transform: [ 192, 0, 0, 0, 144, 0],
          children: [],
        },
        {
          stroke: null,
          fill: null,
          depth: 0,
          transform: [ 1, 0, 8, 0, 1, 13],
          children: [
            {
              stroke: null,
              fill: "#FFFFFF",
              shape: new Circle(4, 0, 0),
              depth: 0,
              transform: [ 1, 0, 0, 0, 1, 0],
              children: [],
            }
          ],
        },
        {
          stroke: null,
          fill: null,
          depth: 0,
          transform: [ 1, 0, 16, 0, 1, 16],
          children: config.assets.stages().map((e, i) => {
            return {
              text: e,
              stroke: null,
              fill: "#FFFFFF",
              depth: 0,
              transform: [ 1, 0, 0, 0, 1, i * 16] as Transform,
              children: [],
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
        this.send("push", new EntityAddEvent("push", new StageEntity({
          assets: config.assets,
          stage: config.assets.stages()[position],
          entities: config.entities,
        }), { block: true }));
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

      identity(this.render.children[1].children[0].transform);
      translate(this.render.children[1].children[0].transform, 0, position * 16);
    });

    RenderSystem(this);
  }
}
