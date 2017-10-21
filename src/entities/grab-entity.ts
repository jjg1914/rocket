import { merge } from "lodash";

import {
  SimpleEntityConfig,
  SimpleEntity,
  MoveSystem,
  AccelSystem,
} from "mu-engine";

import { GrabableSystem, GrabableConfig } from "../systems/grabable-system";

export interface GrabConfig extends SimpleEntityConfig {
  grabable: Partial<GrabableConfig>;
}

export class GrabEntity extends SimpleEntity {
  constructor(config: Partial<GrabConfig>) {
    super(merge({
      accel: { drag: 96, nogravity: _nogravityForMode(config.grabable) },
      render: { fill: "#FF0000" },
    }, config));

    GrabableSystem(this, merge({
      mode: "pickup",
    }, config.grabable));

    AccelSystem(this);
    MoveSystem(this);
  }
}

function _nogravityForMode(config?: Partial<GrabableConfig>): boolean {
  if (config != null) {
    switch (config.mode) {
    case "fixed":
      return true;
    default:
      return false;
    }
  } else {
    return false;
  }
}
