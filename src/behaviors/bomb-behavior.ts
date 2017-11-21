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

export interface BombBehaviorConfig {
  frequency: number;
}

export interface TargetSource {
  target(): TargetEventEntity | undefined;
}

export class BombBehavior implements Behavior {
  private _t: number;
  private _entity: BombBehaviorEntity;
  private _targetSource: TargetSource;
  private _config: BombBehaviorConfig;

  constructor(entity: BombBehaviorEntity,
              targetSource: TargetSource,
              config?: Partial<BombBehaviorConfig>) {
    this._t = 0;
    this._entity = entity;
    this._targetSource = targetSource;
    this._config = Object.assign({
      frequency: 2000,
    }, config);
  }

  reset(): void {}

  call(options: BehaviorOptions): BehaviorState {
    const target = this._targetSource.target();

    if (this._t > 0) {
      this._t = Math.max(this._t - options.dt, 0);
    }

    if (target !== undefined && this._t === 0) {
      if (this._entity.parent !== undefined) {
        const bomb = new BombEntity({
          position: {
            x: this._entity.position.x + 2,
            y: this._entity.position.y + 2,
          },
        });

        this._t = this._config.frequency;
        this._entity.parent.send("put", new EntityAddEvent("put", bomb));
        return "success";
      } else {
        return "failure";
      }
    } else {
      return "failure";
    }
  }
}
