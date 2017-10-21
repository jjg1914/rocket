import {
  SimpleEntityConfig,
  SimpleEntity,
  AccelSystem,
  MoveSystem,
} from "mu-engine";

import { FallingSystem } from "../systems/falling-system";

export class FallingPlatformEntity extends SimpleEntity {
  constructor(config: Partial<SimpleEntityConfig>) {
    super({
      accel: { friction: 224, nogravity: true },
      movement: { yMax: 192 },
      collision: { solid: [ null, 1 ] },
      render: { sprite: "block.json", spriteFrame: 0 },
    }, config);

    AccelSystem(this);
    MoveSystem(this);
    FallingSystem(this);
  }
}
