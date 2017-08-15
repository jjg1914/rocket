import {
  CollectionEntity,
  IntervalModule,
  InputConfig,
  InputModule,
  RenderConfig,
  RenderModule,
  MoveModule,
  CollisionModule,
  Assets,
} from "mu-engine";

import { PlayerEntity } from "../entities/player-entity";
import { GrabEntity } from "../entities/grab-entity";
import { FloorEntity } from "../entities/floor-entity";
import { PlatformEntity } from "../entities/platform-entity";
import { FallingPlatformEntity } from "../entities/falling-platform-entity";
import { PhasePlatformEntity } from "../entities/phase-platform-entity";

export interface StageConfig {
  assets: Assets;
  stage: string;
}

export class StageEntity extends CollectionEntity {
  constructor(config: StageConfig & InputConfig & RenderConfig) {
    super();

    const stage = config.assets.load(config.stage);
    this.put(new PlayerEntity({
      position: { x: 800, y: 112 },
      camera: {
        bounds: stage.bounds(),
        dimensions: { width: 192, height: 144 },
      },
    }));
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

    InputModule(this, config);
    IntervalModule(this, { interval: { fps: 60 } });
    MoveModule(this, { move: { gravity: 480, bounds: stage.bounds() } });
    CollisionModule(this, { collision: { bounds: stage.bounds() } });
    RenderModule(this, config);
  };
}
