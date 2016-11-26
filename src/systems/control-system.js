import { Keys } from "../modules/input";

export default function ControlSystem(event, engine, target) {
  const dt = event.dt / 1000;

  engine.run(target, [ "control", "movement" ], (e) => {
    let accel = 0;

    switch (event.which) {
    case Keys.ARROW_LEFT:
      accel = -e.control.xAccel;
      break;
    case Keys.ARROW_RIGHT:
      accel = e.control.xAccel;
      break;
    case Keys.ARROW_UP:
      if (event.type === "keydown") {
        e.movement.ySpeed = -e.control.jumpSpeed;
      }
      return;
    }

    switch (event.type) {
    case "keydown":
      accel *= 1;
      break;
    case "keyup":
      accel *= -1;
      break;
    default:
      accel *= 0;
      break;
    }

    e.movement.xAccel += accel;
  });
}
