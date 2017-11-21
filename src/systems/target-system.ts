import { TargetEventEntity, TargetEventData } from "../events/target-event";

export function TargetSystem(entity: TargetEventEntity ): void {
  entity.on("target", (event: TargetEventData) => {
    for (let i = 0; i < event.tags.length; ++i) {
      if (event.tags[i] === entity.target.tag) {
        event.targets.push(entity);
        break;
      }
    }
  });
};
