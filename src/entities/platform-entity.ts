import {
  SimpleEntityConfig,
  SimpleEntity,
  PathSystem,
  PathData,
  PathComponent,
} from "mu-engine";

export interface FloorConfig extends SimpleEntityConfig {
  path: Partial<PathData>;
}

export class PlatformEntity extends SimpleEntity {
  path: PathData;

  constructor(config: Partial<FloorConfig>) {
    super({
      collision: { solid: [ null, 1 ] },
      accel: { friction: 128 },
    }, config);

    this.path = new PathComponent(Object.assign({
      repeat: true,
    }, config.path));

    PathSystem(this);
  }
}
