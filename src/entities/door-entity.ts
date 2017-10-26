import { SimpleEntity, SimpleEntityConfig } from "mu-engine";

import { DoorComponent, DoorData } from "../components/door-component";

import {
  DoorEntity as DoorEntityData,
  DoorEventData,
} from "../events/door-event";

export interface DoorConfig extends SimpleEntityConfig {
  door: DoorData;
}

export class DoorEntity extends SimpleEntity implements DoorEntityData {
  door: DoorData;

  constructor(config: Partial<DoorConfig>) {
    super(config);

    this.door = new DoorComponent(config.door);

    this.on("door", (ev: DoorEventData) => {
      ev.target = this;
      return true;
    });
  }
}
