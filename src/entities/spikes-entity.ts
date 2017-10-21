import { merge } from "lodash";

import {
  ResolutionEvent,
  SimpleEntityConfig,
  SimpleEntity,
  snap,
} from "mu-engine";

export class SpikesEntity extends SimpleEntity {
  constructor(config: Partial<SimpleEntityConfig>) {
    super(merge({
      render: {
        sprite: "spikes.json",
        spriteFrame: 0,
        transform: [ 1, 0, -1, 0, 1, -4 ],
      },
    }, config, {
      position: { width: 14, height: 12 },
    }));

    snap(this, "middle", "bottom", 16, 16);

    this.on("collision", (ev: ResolutionEvent) => {
      ev.target.send("die");
    });
  }
}
