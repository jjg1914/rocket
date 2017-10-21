import {
  ResolutionEvent,
  SimpleEntityConfig,
  SimpleEntity,
} from "mu-engine";

export class SpikesEntity extends SimpleEntity {
  constructor(config: Partial<SimpleEntityConfig>) {
    super({
      render: { sprite: "spikes.json", spriteFrame: 0 },
    }, config);

    this.on("collision", (ev: ResolutionEvent) => {
      ev.target.send("die");
    });
  }
}
