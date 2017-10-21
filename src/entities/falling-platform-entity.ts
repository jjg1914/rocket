import { merge } from "lodash";

import {
  SimpleEntityConfig,
  AccelSystem,
  MoveSystem,
} from "mu-engine";

import { PlatformEntity } from "./platform-entity";
import { FallingSystem } from "../systems/falling-system";

export class FallingPlatformEntity extends PlatformEntity {
  constructor(config: Partial<SimpleEntityConfig>) {
    super(merge({
      accel: { nogravity: true },
      movement: { yMax: 192 },
      render: { sprite: "block.json", spriteFrame: 0 },
    }, config));

    AccelSystem(this);
    MoveSystem(this);
    FallingSystem(this);
  }
}
