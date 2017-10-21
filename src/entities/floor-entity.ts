import {
  SimpleEntityConfig,
  SimpleEntity,
} from "mu-engine";

export class FloorEntity extends SimpleEntity {
  constructor(config: Partial<SimpleEntityConfig>) {
    super({
      accel: { friction: 224 },
      collision: { solid: true },
    }, config);
  }
}
