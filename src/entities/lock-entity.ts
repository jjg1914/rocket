import { merge } from "lodash";

import {
  SimpleEntityConfig,
  SimpleEntity,
} from "mu-engine";

import { KeyData, KeyComponent } from "../components/key-component";

export interface LockConfig extends SimpleEntityConfig {
  key: Partial<KeyData>;
}

export class LockEntity extends SimpleEntity {
  key: KeyData;

  constructor(config: Partial<LockConfig>) {
    super(merge({
      collision: { solid: true },
      position: { width: 16, height: 32 },
      render: { sprite: "locks.json" },
    }, config));

    this.key = new KeyComponent(config.key);
  }
}
