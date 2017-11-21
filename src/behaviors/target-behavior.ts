import {
  Entity,
  Behavior,
  BehaviorState,
  BehaviorOptions,
  PositionData,
} from "mu-engine";

import { TargetEvent, TargetEventEntity } from "../events/target-event";

export interface TargetBehaviorEntity extends Entity {
  position: PositionData;
}

export interface TargetBehaviorConfig {
  range: number;
  xOffset: number;
  yOffset: number;
}

export class TargetBehavior implements Behavior {
  private _entity: TargetBehaviorEntity;
  private _target?: TargetEventEntity;
  private _config: TargetBehaviorConfig;

  constructor(entity: TargetBehaviorEntity,
              config?: Partial<TargetBehaviorConfig>) {
    this._entity = entity;
    this._config = Object.assign({
      range: Infinity,
      xOffset: 0,
      yOffset: 0,
    }, config);
  }

  target(): TargetEventEntity | undefined {
    return this._target;
  }

  reset(): void {
    this._target = undefined;
  }

  call(_options: BehaviorOptions): BehaviorState {
    if (this._target === undefined) {
      if (this._entity.parent !== undefined) {
        const ev = new TargetEvent("player");
        this._entity.parent.send("target", ev);

        for (let i = 0; i < ev.targets.length; ++i) {
          const tx = ev.targets[i].position.x + this._config.xOffset;
          const ty = ev.targets[i].position.y + this._config.yOffset;

          const xd = Math.abs(tx - this._entity.position.x);
          const yd = Math.abs(ty - this._entity.position.y);

          if (xd + yd <= this._config.range) {
            this._target= ev.targets[i];
            break;
          }
        }

        if (this._target !== undefined) {
          return "success";
        } else {
          return "failure";
        }
      } else {
        return "failure";
      }
    } else {
      const tx = this._target.position.x + this._config.xOffset;
      const ty = this._target.position.y + this._config.yOffset;

      const xd = Math.abs(tx - this._entity.position.x);
      const yd = Math.abs(ty - this._entity.position.y);

      if (xd + yd > this._config.range) {
        this._target = undefined;
        return "failure";
      } else {
        return "success";
      }
    }
  }
}
