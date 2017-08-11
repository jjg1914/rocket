import {
  CollectionEntity,
  IntervalConfig,
  IntervalModule,
  InputConfig,
  InputModule,
  RenderConfig,
  RenderModule,
  MoveConfig,
  MoveModule,
  CollisionConfig,
  CollisionModule,
  Assets,
  mixin,
} from "mu-engine";

import { PlayerEntity } from "../entities/player-entity";
import { GrabEntity } from "../entities/grab-entity";
import { FloorEntity } from "../entities/floor-entity";
import { PlatformEntity } from "../entities/platform-entity";

export interface StageConfig extends IntervalConfig,
                                     InputConfig,
                                     RenderConfig,
                                     MoveConfig,
                                     CollisionConfig {
  assets: Assets;
  stage: string;
}

export const StageEntity = mixin([
  RenderModule,
  CollisionModule,
  MoveModule,
  IntervalModule,
  InputModule,
], class extends CollectionEntity {
  constructor(config: StageConfig ) {
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

    Object.assign(config, {
      collision: { bounds: stage.bounds() },
      move: { gravity: 208, bounds: stage.bounds() },
    });
  };
});
