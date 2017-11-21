import { GrabEntity } from "./grab-event";

export type GrabbedEventType = "grabbed";

export interface GrabbedEventData {
  type: GrabbedEventType;
  target: GrabEntity;
}

export class GrabbedEvent implements GrabbedEventData {
  type: GrabbedEventType;
  target: GrabEntity;

  constructor(target: GrabEntity) {
    this.type = "grabbed";
    this.target = target;
  }
}
