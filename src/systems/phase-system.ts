import { Entity } from "mu-engine";

export interface PhaseConfig {
  phase?: number;
  on: number;
  off: number;
}

export function PhaseSystem(entity: Entity, config: PhaseConfig): void {
  const interval = config.on + config.off;
  entity.setActive(config.phase == null || config.phase <= 0);

  setTimeout(() => {
    entity.activate();
    setInterval(() => {
      entity.activate();
    }, interval);
  }, config.phase != null ? config.phase : 0)

  setTimeout(() => {
    entity.deactivate();
    setInterval(() => {
      entity.deactivate();
    }, interval);
  }, config.on + (config.phase != null ? config.phase : 0));
}
