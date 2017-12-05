import { merge } from "lodash";

import {
  Circle,
  AnimationData,
  AnimationComponent,
  AnimationSystem,
  SimpleEntity,
  SimpleEntityConfig,
  EntityDestroyEvent,
  ResolutionEvent,
} from "mu-engine";

import { DieEvent } from "../events/die-event";
import { TargetEvent } from "../events/target-event";

export interface ExplosionEntityConfig extends SimpleEntityConfig {
  animation: Partial<AnimationData>;
  target: Partial<{ targets: string | string[] }>
}

export class ExplosionEntity extends SimpleEntity {
  animation: AnimationData;

  constructor(config?: Partial<ExplosionEntityConfig>) {
    super(merge({
      render: {
        sprite: "explosion-1.json",
        transform: [ 1, 0, -2, 0, 1, -2 ],
      },
      position: { width: 28, height: 28, mask: new Circle(12, 0, 0) },
    }, config));

    this.animation = new AnimationComponent(merge({
      tag: "default",
      loop: false,
    }, (config || {}).animation));

    AnimationSystem(this);

    this.on("animation-end", () => {
      if (this.parent !== undefined) {
        this.parent.send("remove", new EntityDestroyEvent("remove", this));
      }
    });

    this.on("collision", (ev: ResolutionEvent) => {
      const ev2 = new TargetEvent(((config || {}).target || {}).targets || []);
      ev.target.send("target", ev2);

      for (let i = 0; i < ev2.targets.length; ++i) {
        ev2.targets[i].send("die", new DieEvent());
      }
    });
  }

  static explosion1(x: number, y: number, targets: string | string[] = [])
  : ExplosionEntity {
    return new ExplosionEntity({
      position: { x: x, y: y },
      target: { targets: targets },
    });
  }

  static explosion2(x: number, y: number, targets: string | string[] = [])
  : ExplosionEntity {
    return new ExplosionEntity({
      render: {
        sprite: "explosion-2.json",
      },
      position: {
        x: x,
        y: y,
        width: 12,
        height: 12,
        mask: new Circle(6, 0, 0),
      },
      target: { targets: targets },
    });
  }
}
