import {
  SimpleEntityConfig,
  PathSystem,
  PathData,
  PathComponent,
} from "mu-engine";

import { PlatformEntity } from "./platform-entity";

export interface PathPlatformConfig extends SimpleEntityConfig {
  path: Partial<PathData>;
}

export class PathPlatformEntity extends PlatformEntity {
  path: PathData;

  constructor(config: Partial<PathPlatformConfig>) {
    super(config);

    this.path = new PathComponent(Object.assign({
      repeat: true,
    }, config.path));

    PathSystem(this);
  }
}
