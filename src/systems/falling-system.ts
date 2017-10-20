import { CollisionEntity, EntityDestroyEvent } from "mu-engine";

export function FallingSystem(entity: CollisionEntity): void {
  entity.on("landing", () => {
    setTimeout(() => {
      if (entity.accel != null) {
        entity.accel.nogravity = false;
      }
    }, 500);
  });

  entity.on("outofbounds", () => {
    console.log("outofbounds: " + entity.id)
    entity.send("remove", new EntityDestroyEvent("remove"));
  });
};

