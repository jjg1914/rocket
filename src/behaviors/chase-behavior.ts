import {
  Entity,
  Behavior,
  BehaviorState,
  BehaviorOptions,
  AccelData,
  PositionData,
  ControlData,
} from "mu-engine";

import { TargetEventEntity } from "../events/target-event";

export interface ChaseBehaviorEntity extends Entity {
  accel: AccelData;
  position: PositionData;
  control: ControlData;
}

export interface ChaseBehaviorConfig {
  range: number;
  xOffset: number;
  yOffset: number;
}

export interface TargetSource {
  target(): TargetEventEntity | undefined;
}

export class ChaseBehavior implements Behavior {
  private _entity: ChaseBehaviorEntity;
  private _targetSource: TargetSource;
  private _config: ChaseBehaviorConfig;

  constructor(entity: ChaseBehaviorEntity,
              targetSource: TargetSource,
              config?: Partial<ChaseBehaviorConfig>) {
    this._entity = entity;
    this._targetSource = targetSource;
    this._config = Object.assign({
      range: Infinity,
      xOffset: 0,
      yOffset: 0,
    }, config);
  }

  reset(): void {}

  call(_options: BehaviorOptions): BehaviorState {
    const target = this._targetSource.target();

    if (target !== undefined) {
      const tx = target.position.x + this._config.xOffset;
      const ty = target.position.y + this._config.yOffset;

      const xd = Math.abs(tx - this._entity.position.x);
      const yd = Math.abs(ty - this._entity.position.y);

      if (xd + yd > this._config.range) {
        if (xd > 16) {
          if (tx > this._entity.position.x) {
            this._entity.accel.xAccel = this._entity.control.xAccel;
          } else {
            this._entity.accel.xAccel = -this._entity.control.xAccel;
          }
        } else {
          this._entity.accel.xAccel = 0;
        }

        if (yd > 16) {
          if (ty > this._entity.position.y) {
            this._entity.accel.yAccel = this._entity.control.yAccel;
          } else {
            this._entity.accel.yAccel = -this._entity.control.yAccel;
          }
        } else {
          this._entity.accel.yAccel = 0;
        }

        return "pending";
      } else {
        this._entity.accel.xAccel = 0;
        this._entity.accel.yAccel = 0;
        return "success";
      }
    } else {
      return "failure";
    }
  }
}
