import {
  SimpleEntityConfig,
} from "mu-engine";

import { PlatformEntity } from "./platform-entity";
import {
  OscillateComponent,
  OscillateData,
} from "../components/oscillate-component";
import { OscillateSystem } from "../systems/oscillate-system";

export interface OscillatePlatformConfig extends SimpleEntityConfig {
  oscillate: Partial<OscillateData>;
}

export class OscillatePlatformEntity extends PlatformEntity {
  oscillate: OscillateData;

  constructor(config: Partial<OscillatePlatformConfig>) {
    super(config);

    this.oscillate = new OscillateComponent(config.oscillate);

    OscillateSystem(this);
  }
}
