import {
  SimpleEntityConfig,
} from "mu-engine";

import { PlatformEntity } from "./platform-entity";
import { PhaseSystem, PhaseConfig } from "../systems/phase-system";

export interface PhasePlatformConfig extends SimpleEntityConfig {
  phase: Partial<PhaseConfig>
}

export class PhasePlatformEntity extends PlatformEntity {
  constructor(config: Partial<PhasePlatformConfig>) {
    super(config);

    PhaseSystem(this, Object.assign({
      on: 2000,
      off: 2000,
    }, config.phase));
  }
}
