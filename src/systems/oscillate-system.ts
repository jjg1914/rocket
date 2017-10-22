import {
  Entity,
  PositionData,
  MovementData,
  MoveEventData,
} from "mu-engine";

import { OscillateData } from "../components/oscillate-component";

export interface OscillateEntity extends Entity {
  position: PositionData;
  movement: MovementData;
  oscillate: OscillateData;
}

export function OscillateSystem(entity: OscillateEntity): void {
  entity.on("premove", (event: MoveEventData) => {
    if (entity.oscillate.t === 0) {
      entity.oscillate.xInitial = entity.position.x;
      entity.oscillate.yInitial = entity.position.y;
    }

    entity.oscillate.t += event.dt;

    const oldX = entity.position.x;
    const oldY = entity.position.y;
    const xT = entity.oscillate.t % entity.oscillate.xFrequency;
    const yT = entity.oscillate.t % entity.oscillate.yFrequency;

    if (!isNaN(xT)) {
      const t = ((xT * 2) / entity.oscillate.xFrequency) - 1;
      entity.position.x = Math.floor(entity.oscillate.xInitial + (-Math.abs(t) + 1) * entity.oscillate.xAmplitude);
    }

    if (!isNaN(yT)) {
      const t = ((yT * 2) / entity.oscillate.yFrequency) - 1;
      entity.position.y = Math.floor(entity.oscillate.yInitial + (-Math.abs(t) + 1) * entity.oscillate.yAmplitude);
    }

    entity.movement.xChange = entity.position.x - oldX;
    entity.movement.yChange = entity.position.y - oldY;
  });
}
