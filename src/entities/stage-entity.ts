import {
  CollectionEntity,
  MoveModule,
  PositionData,
  PositionComponent,
  RenderData,
  RenderComponent,
  RenderSystem,
  CameraSystem,
  CollisionModule,
  Assets,
  EntityAddEvent,
} from "mu-engine";

import { PlayerEntity } from "../entities/player-entity";
import { HudEntity } from "../entities/hud-entity";
import { GrabEntity } from "../entities/grab-entity";
import { FloorEntity } from "../entities/floor-entity";
import { PlatformEntity } from "../entities/platform-entity";
import { FallingPlatformEntity } from "../entities/falling-platform-entity";
import { PhasePlatformEntity } from "../entities/phase-platform-entity";
import { HudSystem } from "../systems/hud-system";

export interface StageConfig {
  assets: Assets;
  stage: string;
}

export class StageEntity extends CollectionEntity {
  position: PositionData;
  render: RenderData;

  constructor(config: StageConfig) {
    super();

    const stage = config.assets.load(config.stage);

    this.position = new PositionComponent({
      width: stage.bounds().right,
      height: stage.bounds().bottom,
    });

    this.render = new RenderComponent({
      fill: "#FFFFFF",
    });

    const player = new PlayerEntity({
      position: { x: 496, y: 80 },
    });

    player.on("die", () => {
      setTimeout(() => {
        this.send("swap", new EntityAddEvent("swap", new StageEntity(config)));
      }, 3000);
    })

    const hud = new HudEntity();

    this.put(player);
    this.put(hud);
    stage.build(this, {
      entities: {
        default: FloorEntity,
        floor: FloorEntity,
        platform: PlatformEntity,
        "falling-platform": FallingPlatformEntity,
        "phase-platform": PhasePlatformEntity,
        grab: GrabEntity,
      },
      assets: config.assets,
    });

    MoveModule(this, { move: { gravity: 480, bounds: stage.bounds() } });
    CollisionModule(this, { collision: { bounds: stage.bounds() } });
    CameraSystem(this, player, {
      camera: {
        bounds: stage.bounds(),
        dimensions: { width: 192, height: 144 },
      }
    });
    HudSystem(this, hud, player);
    RenderSystem(this);
  };
}
