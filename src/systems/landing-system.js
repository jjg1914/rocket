import { shapeFor } from "../util/shape";

export default function LandingSystem() {
  let bumps = [];
  let prev = null;

  return (event, engine, target) => {
    switch (event.type) {
    case "interval":
      engine.run(target, [ "position", "movement" ], (e) => {
        let landing = null;

        if (bumps.length === 1) {
          landing = bumps[0];
        } else {
          let bounds = shapeFor(e).bounds();
          let d = Infinity;

          for (let b of bumps) {
            let other = shapeFor(b).bounds();
            let f = Math.min(bounds.right, other.right) -
                    Math.max(bounds.left, other.left);

            if (f < Infinity) {
              landing = b;
              d = f;
            }
          }
        }

        if (landing == null && prev != null) {
          engine.run(prev, [ "position" ], (f) => {
            let b1 = shapeFor(e).bounds();
            let b2 = shapeFor(f).bounds();

            if (e.movement.ySpeed > 0 &&
                b1.left <= b2.right && b1.right >= b2.left) {
              landing = prev;
            }
          });
        }

        bumps.length = 0;
        prev = landing;

        engine.run(landing, [ "position", "movement" ], (f) => {
          const dt = event.dt / 1000;

          if (e.movement.xSpeed === 0) {
            e.position.x = _phaseSync(e.position.x, f.position.x,
                                      f.movement.xSpeed, dt);
          }

          e.position.y = _phaseSync(e.position.y, f.position.y,
                                    f.movement.ySpeed, dt);

          e.position.x += f.movement.xSpeed * dt;
          e.position.y += f.movement.ySpeed * dt;
        });
      });

      break;
    case "bump":
      if (event.mtv[1] > 0) {
        bumps.push(event.target);
      }
      break;
    }
  };
}

function _phaseSync(a, b, d, dt) {
  let old = b - d * dt;

  return Math.floor(a) + (old - Math.floor(old));
}
