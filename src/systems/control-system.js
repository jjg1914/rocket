import { Keys } from "mu-engine";

export default class ControlSystem {
  constructor(target) {
    this._target = target;
  }

  keydown(event, engine) {
    engine.run(this._target, [ "control", "movement" ], (e) => {
      e.movement.xAccel += _accel(event.which, e.control.xAccel);
    });
  }

  keyup(event, engine) {
    engine.run(this._target, [ "control", "movement" ], (e) => {
      e.movement.xAccel -= _accel(event.which, e.control.xAccel);
    });
  }
}

function _accel(which, accel) {
  switch (which) {
  case Keys.ARROW_LEFT:
    return -accel; 
  case Keys.ARROW_RIGHT:
    return accel; 
  default:
    return 0;
  }
}
