import { Entity } from "mu-engine";

import { DoorData } from "../components/door-component";

export interface DoorEntity extends Entity {
  door: DoorData;
}

export interface DoorEventData {
  type: "door";
  target?: DoorEntity;
}

export class DoorEvent implements DoorEventData {
  type: "door";
  target?: DoorEntity;

  constructor() {
    this.type = "door";
  }
}
