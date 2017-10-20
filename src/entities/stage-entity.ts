import {
  StageConfig,
  StageEntity as BaseStageEntity,
  PositionData,
  RenderData,
  CameraSystem,
  EntityDestroyEvent,
} from "mu-engine";

import { PlayerEntity } from "../entities/player-entity";
// import { HudEntity } from "../entities/hud-entity";
// import { HudSystem } from "../systems/hud-system";

export class StageEntity extends BaseStageEntity {
  position: PositionData;
  render: RenderData;

  constructor(config: StageConfig) {
    super(config);

    this.render.fill = "#000";

    const player = new PlayerEntity({
      position: this.stage.prop("player"),
    });

    player.on("die", () => {
      setTimeout(() => {
        this.send("pop", new EntityDestroyEvent("pop"));
      }, 3000);
    })

    // const hud = new HudEntity();

    this.put(player);
    // this.put(hud);

    CameraSystem(this, player, {
      camera: {
        bounds: this.stage.bounds(),
        dimensions: { width: 192, height: 144 },
      }
    });
    // HudSystem(this, hud, player);
  };
}
