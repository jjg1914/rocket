import { merge } from "lodash";

import {
  ResolutionEvent,
  EntityDestroyEvent,
  AnimationData,
  AnimationComponent,
  AnimationSystem,
  SimpleEntityConfig,
  SimpleEntity,
  snapMiddle,
} from "mu-engine";

import { PlayerEntity } from "./player-entity";

const TAGS = [
  "apple",
  "watermelon",
  "banana",
  "pear",
  "orange",
  "grapes",
];

export interface FruitConfig extends SimpleEntityConfig {
  animation: Partial<AnimationData>;
}

export class FruitEntity extends SimpleEntity {
  animation: AnimationData;

  constructor(config: Partial<FruitConfig>) {
    const offset = Math.floor(TAGS.length * Math.random());

    super(merge({
      render: {
        sprite: "fruit.json",
        spriteFrame: (offset * 6) + (Math.floor(6 * Math.random())),
        transform: [ 1, 0, -2, 0, 1, -2 ],
      },
    }, config, {
      position: { width: 12, height: 12 },
    }));

    this.animation = new AnimationComponent(merge({
      tag: TAGS[offset],
    }, config.animation));

    snapMiddle(this, 16, 16);

    AnimationSystem(this);

    this.on("collision", (ev: ResolutionEvent) => {
      if (ev.target instanceof PlayerEntity) {
        this.send("remove", new EntityDestroyEvent("remove"));
      }
    });
  }
}
