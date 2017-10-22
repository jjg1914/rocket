import {
  Entity,
  RenderEventData,
} from "mu-engine";

import { HudEntity } from "../entities/hud-entity";
import { StatsData } from "../components/stats-component";

export interface HudConfig {};
export interface HudTargetEntity {
  stats: StatsData;
}

export function HudSystem(entity: Entity, hud: HudEntity, _target: HudTargetEntity) {
  entity.after("prerender", (ev: RenderEventData) => {
    hud.position.x = ev.viewport.left;
    hud.position.y = ev.viewport.top;
  });
}
