import Collision from "../util/collision";

export default function CollisionSystem(engine, bounds) {
  const collision = new Collision(bounds);
  const translations = [];

  engine.run([ "position" ], (e) => {
    collision.add(e);
  });

  engine.run([ "position" ], (e) => {
    if (e.solid) {
      return;
    }

    let xTarget = null, yTarget = null;
    let xD = Infinity, yD = Infinity;

    for (let c of collision.query(e)) {
      if (c.entity.solid) {
        if (c.mtv[0] !== 0 && Math.abs(c.mtv[0]) < xD) {
          xTarget = c;
          xD = Math.abs(c.mtv[0]);
        }

        if (c.mtv[1] !== 0 && Math.abs(c.mtv[1]) < yD) {
          yTarget = c;
          yD = Math.abs(c.mtv[1]);
        }
      }
    }

    if (xTarget != null) {
      translations.push({
        entity: e,
        mtv: xTarget.mtv,
        target: xTarget.entity,
      });

      engine.emit({
        type: "bump",
        target: xTarget.entity,
        mtv: xTarget.mtv,
      });
    }

    if (yTarget != null) {
      translations.push({
        entity: e,
        mtv: yTarget.mtv,
        target: yTarget.entity,
      });

      engine.emit({
        type: "bump",
        target: yTarget.entity,
        mtv: yTarget.mtv,
      });
    }
  });

  for (let t of translations) {
    if (t.mtv[0] !== 0) {
      t.entity.position.x = Math.round(t.entity.position.x - t.mtv[0]);
    }

    if (t.mtv[1] !== 0) {
      t.entity.position.y = Math.round(t.entity.position.y - t.mtv[1]);
    }

    if (t.entity.movement != null)  {
      if (t.mtv[0] !== 0) {
        t.entity.movement.xSpeed = 0;
      }

      if (t.mtv[1] !== 0) {
        t.entity.movement.ySpeed = 0;
      }
    }
  }
}
