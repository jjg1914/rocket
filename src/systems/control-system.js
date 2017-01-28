import { Keys } from "../modules/input";

export default function ControlSystem(state, target) {
  state.on("keydown", (event, engine) => {
    engine.run(target, [ "control", "movement" ], (e) => {
      e.movement.xAccel += _accel(event.which, e.control.xAccel);
    });
  });

  state.on("keyup", (event, engine) => {
    engine.run(target, [ "control", "movement" ], (e) => {
      e.movement.xAccel -= _accel(event.which, e.control.xAccel);
    });
  });
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
