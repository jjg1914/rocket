import {
  SimpleEntityConfig,
  SimpleEntity,
  AccelSystem,
  MoveSystem,
} from "mu-engine";

import { PhaseSystem, PhaseConfig } from "../systems/phase-system";

export interface PhasePlatformConfig extends SimpleEntityConfig {
  phase: Partial<PhaseConfig>
}

export class PhasePlatformEntity extends SimpleEntity {
  constructor(config: Partial<PhasePlatformConfig>) {
    super({
      accel: { nogravity: true, friction: 128 },
      collision: { solid: [ null, 1 ] },
    }, config);

    AccelSystem(this);
    MoveSystem(this);
    PhaseSystem(this, Object.assign({
      on: 2000,
      off: 2000,
    }, config.phase));
  }
}
