import {
  Entity,
  RenderEventData,
  identity,
  translate,
  scale,
} from "mu-engine";
import { HudEntity } from "../entities/hud-entity";
import { StatsData } from "../components/stats-component";

export interface HudConfig {};
export interface HudTargetEntity {
  stats: StatsData;
}

export function HudSystem(entity: Entity, hud: HudEntity, target: HudTargetEntity) {
  entity.after("prerender", (ev: RenderEventData) => {
    const transform = hud.render.transform;

    if (transform != undefined) {
      identity(transform);
      scale(transform, Math.floor(32 * (target.stats.hitPoints / target.stats.hitPointsMax)), 8);
      translate(transform, ev.viewport.left + 4, ev.viewport.top + 2);
    }
  });
}
