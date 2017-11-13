import { merge } from "lodash";

import { snap } from "mu-engine";

import { GrabEntity, GrabConfig } from "./grab-entity";
import { KeyData, KeyComponent } from "../components/key-component";

export interface KeyConfig extends GrabConfig {
  key: Partial<KeyData>;
}

export class KeyEntity extends GrabEntity {
  key: KeyData;

  constructor(config: Partial<KeyConfig>) {
    super(merge({
      grabable: { mode: "pickup" },
      position: { width: 10, height: 11 },
      render: {
        sprite: "keys.json",
        transform: [ 1, 0, -3, 0, 1, 0 ],
      },
    }, config));

    snap(this, "middle", "bottom", 16, 16);

    this.key = new KeyComponent(config.key);
  }
}
