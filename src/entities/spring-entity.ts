import { merge } from "lodash";

import {
  SimpleEntityConfig,
  SimpleEntity,
  AnimationData,
  AnimationComponent,
  AnimationSystem,
} from "mu-engine";

import { SpringSystem } from "../systems/spring-system";

export interface SpringEntityConfig extends SimpleEntityConfig {
  animation: Partial<AnimationData>;
}

export class SpringEntity extends SimpleEntity {
  animation: AnimationData;

  constructor(config: Partial<SpringEntityConfig>) {
    super(merge({
      collision: { solid: [ null, 1 ] },
      render: { sprite: "spring.json", spriteFrame: 0 },
    }, config));

    this.animation = new AnimationComponent(merge({
      tag: "",
      loop: false,
    }, config.animation));

    SpringSystem(this);
    AnimationSystem(this);
  }
}
