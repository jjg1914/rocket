import { merge } from "lodash";

import { SimpleEntityConfig } from "mu-engine";

import { FloorEntity } from "./floor-entity";

export class PlatformEntity extends FloorEntity {
  constructor(config: Partial<SimpleEntityConfig>) {
    super(merge({
      collision: { solid: [ NaN, 1 ] },
    }, config));
  }
}
