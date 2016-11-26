function _accel(dt, speed, accel, max, friction) {
  if (accel !== 0) {
    speed += accel * dt;

    if (max != null) {
      speed = Math.max(Math.min(speed, max), -max);
    }
  } else if (friction != null && speed !== 0) {
    if (Math.abs(speed) < friction * dt) {
      speed = 0;
    } else {
      speed += friction * dt * (speed > 0 ? -1 : 1)
    }
  }

  return speed;
}

export default function MovementSystem(event, engine) {
  const dt = event.dt / 1000;

  engine.run([ "position", "movement" ], (e) => {
    let gravity = 0;

    if (e.movement.gravity != null) {
      gravity = e.movement.gravity;
    }

    e.movement.xSpeed = _accel(dt, e.movement.xSpeed,
                                   e.movement.xAccel,
                                   e.movement.xMax,
                                   e.movement.friction);
    e.movement.ySpeed = _accel(dt, e.movement.ySpeed,
                                   e.movement.yAccel + gravity,
                                   e.movement.yMax,
                                   e.movement.friction);

    e.position.x += e.movement.xSpeed * dt;
    e.position.y += e.movement.ySpeed * dt;
  });
}
