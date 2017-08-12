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

export interface StageConfig {
  assets: Assets;
  stage: string;
}

export class StageEntity extends CollectionEntity {
  constructor(config: StageConfig & InputConfig & RenderConfig) {
    super();

    const stage = config.assets.load(config.stage);
    this.put(new PlayerEntity({
      position: { x: 0, y: 112 },
      camera: {
        bounds: stage.bounds(),
        dimensions: { width: 192, height: 144 },
      },
    }));
    stage.build(this, {
      entities: {
        floor: FloorEntity,
        platform: PlatformEntity,
        grab: GrabEntity,
      },
      assets: config.assets,
    });

    RenderModule(this, config);
    CollisionModule(this, { collision: { bounds: stage.bounds() } });
    MoveModule(this, { move: { gravity: 208, bounds: stage.bounds() } });
    IntervalModule(this, { interval: { fps: 60 } });
    InputModule(this, config);
  };
}