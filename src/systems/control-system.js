import { Keys } from "../modules/input";

export default function ControlSystem(event, engine, target) {
  const dt = event.dt / 1000;

  engine.run(target, [ "control", "movement" ], (e) => {
    let accel = 0;
    let speed = 0;

    switch (event.which) {
    case Keys.ARROW_LEFT:
      accel = -e.control.xAccel;
      break;
    case Keys.ARROW_RIGHT:
      accel = e.control.xAccel;
      break;
    case Keys.ARROW_UP:
      if (event.type === "keydown" && e.control.landed != null) {
        e.movement.ySpeed = -e.control.jumpSpeed;
        e.control.landed = null;
      } else if (event.type === "keyup" && e.movement.ySpeed < 0) {
        e.movement.ySpeed = 0;
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
