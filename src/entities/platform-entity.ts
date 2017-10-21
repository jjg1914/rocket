import merge from "lodash.merge";

import { SimpleEntityConfig } from "mu-engine";

import { FloorEntity } from "./floor-entity";

export class PlatformEntity extends FloorEntity {
  constructor(config: Partial<SimpleEntityConfig>) {
    super(merge({
      collision: { solid: [ null, 1 ] },
    }, config));
  }
}
