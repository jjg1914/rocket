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
  xFlip: boolean;
  yFlip: boolean;
}

export interface TargetSource {
  target(): TargetEventEntity | undefined;
}

export class ChaseBehavior implements Behavior {
  private _entity: ChaseBehaviorEntity;
  private _targetSource: TargetSource;
  private _config: ChaseBehaviorConfig;
  private _xLock: number;
  private _yLock: number;

  constructor(entity: ChaseBehaviorEntity,
              targetSource: TargetSource,
              config?: Partial<ChaseBehaviorConfig>) {
    this._entity = entity;
    this._targetSource = targetSource;
    this._config = Object.assign({
      range: 0,
      xOffset: 0,
      yOffset: 0,
      xFlip: false,
      yFlip: false,
    }, config);

    this._xLock = NaN;
    this._yLock = NaN;
  }

  reset(): void {
    this._xLock = NaN;
    this._yLock = NaN;
  }

  call(_options: BehaviorOptions): BehaviorState {
    const target = this._targetSource.target();

    if (target !== undefined) {
      if (isNaN(this._xLock)) {
        const offsetX = (this._config.xFlip &&
                         target.position.x < this._entity.position.x ?
                         -this._config.xOffset : this._config.xOffset);

        this._xLock = target.position.x + offsetX;
      }

      if (isNaN(this._yLock)) {
        const offsetY = (this._config.yFlip &&
                         target.position.y < this._entity.position.y ?
                         -this._config.yOffset : this._config.yOffset);
        this._yLock = target.position.y + offsetY;
      }

      const xd = Math.abs(this._xLock - this._entity.position.x);
      const yd = Math.abs(this._yLock - this._entity.position.y);

      if (xd > this._config.range) {
        if (this._xLock > this._entity.position.x) {
          this._entity.accel.xAccel = this._entity.control.xAccel;
        } else {
          this._entity.accel.xAccel = -this._entity.control.xAccel;
        }
      } else {
        this._entity.accel.xAccel = 0;
      }

      if (yd > this._config.range) {
        if (this._yLock > this._entity.position.y) {
          this._entity.accel.yAccel = this._entity.control.yAccel;
        } else {
          this._entity.accel.yAccel = -this._entity.control.yAccel;
        }
      } else {
        this._entity.accel.yAccel = 0;
      }

      if (this._entity.accel.xAccel !== 0 && this._entity.accel.yAccel !== 0) {
        return "pending";
      } else {
        return "success";
      }
    } else {
      return "failure";
    }
  }
}
