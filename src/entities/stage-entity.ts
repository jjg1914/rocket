import {
  StageConfig,
  StageEntity as BaseStageEntity,
  PositionData,
  RenderData,
  CameraSystem,
  EntityDestroyEvent,
  EntityAddEvent,
} from "mu-engine";

import { DoorEventData } from "../events/door-event";
import { PlayerEntity } from "../entities/player-entity";
import { HudEntity } from "../entities/hud-entity";
import { HudSystem } from "../systems/hud-system";

export class StageEntity extends BaseStageEntity {
  private _config: StageConfig;
  private _player: PlayerEntity;
  private _stages: { [key: string]: StageEntity };

  position: PositionData;
  render: RenderData;

  constructor(config: StageConfig) {
    super(config);

    this._config = config;

    this.render.fill = "#FFF";

    this._player = new PlayerEntity({
      position: this.stage.prop("player"),
    });

    this._player.on("die", () => {
      setTimeout(() => {
        if (this.parent !== undefined) {
          this.parent.send("pop", new EntityDestroyEvent("pop", this));
        }
      }, 3000);
    })

    const hud = new HudEntity();

    this.put(this._player);
    this.put(hud);

    CameraSystem(this, this._player, {
      camera: {
        bounds: this.stage.bounds(),
        dimensions: { width: 192, height: 144 },
      }
    });
    HudSystem(this, hud, this._player);

    this._stages = {};
    this._stages[config.stage] = this;

    this.on("door", (event: DoorEventData) => {
      if (this.parent !== undefined && event.target !== undefined) {
        const stage = this.load(event.target.door.stage);

        stage._player.position.x = event.target.door.x;
        stage._player.position.y = event.target.door.y;

        this._player.movement.xSpeed = 0;
        this._player.movement.ySpeed = 0;
        this._player.accel.xAccel = 0;
        this._player.accel.yAccel = 0;
        this._player.collision.landing = undefined;

        this.parent.send("swap", new EntityAddEvent("swap", stage, { block: true }));
      }
    });
  }

  load(stage: string): StageEntity {
    if (this._stages[stage] === undefined) {
      const tmp = new StageEntity({
        assets: this._config.assets,
        entities: this._config.entities,
        stage: stage,
      });

      tmp._stages = Object.assign(this._stages, tmp._stages);

      this._stages[stage] = tmp;
    }

    return this._stages[stage];
  }
}
