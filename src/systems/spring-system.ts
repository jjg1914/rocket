import {
  RenderData,
  AnimationData,
  CollisionEntity,
  LandingEventData,
} from "mu-engine";

export interface SpringEntity extends CollisionEntity {
  animation: AnimationData;
  render: RenderData;
}

export interface SprintSystemConfig {
  limit: 320;
}

export function SpringSystem(entity: SpringEntity,
                             config: Partial<SprintSystemConfig> = {})
: void {
  const configFull = Object.assign({
    limit: 320,
  }, config) as SprintSystemConfig;

  entity.on("landing", (ev: LandingEventData) => {
    const movement = ev.target.movement;

    if (movement != null) {
      movement.ySpeed = Math.min(-Math.abs(movement.ySpeed) * 2, -configFull.limit);
    }

    ev.target.collision.landing = undefined;
    entity.animation.tag = "release";
  });

  entity.on("animation-end", () => {
    entity.animation.tag = "";
    entity.render.spriteFrame = 0;
  });
}
