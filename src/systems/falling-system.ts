import { CollisionEntity } from "mu-engine";

export function FallingSystem(entity: CollisionEntity): void {
  entity.on("landing", () => {
    setTimeout(() => {
      if (entity.movement != null) {
        entity.movement.nogravity = false;
      }
    }, 500);
  });
};

