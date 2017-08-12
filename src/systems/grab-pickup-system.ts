import {
  CollisionEntity,
} from "mu-engine";

import { GrabEventData } from "../events/grab-event";

export function GrabPickupSystem(entity: CollisionEntity): void {
  entity.on("grab", (event: GrabEventData) => {
    event.target.grab.target = entity;
    event.target.grab.mode = "pickup";
    return true;
  });
};