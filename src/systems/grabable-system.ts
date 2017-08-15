import {
  CollisionEntity,
} from "mu-engine";

import { GrabType } from "../components/grab-component";
import { GrabEventData } from "../events/grab-event";

export interface GrabableConfig {
  mode: GrabType;
}

export function GrabableSystem(entity: CollisionEntity,
                               config?: Partial<GrabableConfig>)
: void {
  entity.on("grab", (event: GrabEventData) => {
    event.target.grab.target = entity;
    event.target.grab.mode = (config != null && config.mode != null ?
                              config.mode : "pickup");
    return true;
  });
};
