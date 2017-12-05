import {
  Entity,
  Behavior,
  BehaviorState,
  BehaviorOptions,
  PositionData,
  EntityAddEvent,
} from "mu-engine";

import { BombEntity } from "../entities/bomb-entity";
import { TargetEventEntity } from "../events/target-event";

export interface BombBehaviorEntity extends Entity {
  position: PositionData;
}

export interface TargetSource {
  target(): TargetEventEntity | undefined;
}

export class BombBehavior implements Behavior {
  private _entity: BombBehaviorEntity;
  private _targetSource: TargetSource;

  constructor(entity: BombBehaviorEntity,
              targetSource: TargetSource) {
    this._entity = entity;
    this._targetSource = targetSource;
  }

  reset(): void {}

  call(_options: BehaviorOptions): BehaviorState {
    const target = this._targetSource.target();

    if (target !== undefined) {
      if (this._entity.parent !== undefined) {
        const bomb = new BombEntity({
          position: {
            x: this._entity.position.x + 2,
            y: this._entity.position.y + 2,
          },
        });

        this._entity.parent.send("put", new EntityAddEvent("put", bomb));
        return "success";
      } else {
        return "failure";
      }
    } else {
      return "pending";
    }
  }
}
