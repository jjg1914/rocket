import { Keys } from "../modules/input";
import { shapeFor } from "../util/shape";

export default function GrabSystem(state, target) {
  let collisions = [];

  state.on("interval", (event, engine) => {
    collisions.length = 0;

    engine.run(target, [ "control", "position" ], (e) => {
      engine.run(e.control.grabed, [ "position" ], (f) => {
        let b = shapeFor(e).bounds();
        let c = shapeFor(f).bounds();

        f.position.x = ((b.right + b.left) / 2) - ((c.right - c.left) / 2);
        f.position.y = b.top - (c.bottom - c.top);
        f.position.ignoreSolid = true;
      });
    });
  });

  state.on("keydown", (event, engine) => {
    if (event.which === Keys.ARROW_DOWN) {
      engine.run(target, [ "control" ], (e) => {
        engine.run(collisions, [ "grab" ], (f) => {
          e.control.grabed = f;
        });
      });
    }
  });

  state.on("collision", (event, engine) => {
    engine.run(target, [], (e) => {
      if (event.entity.meta.id === e.meta.id) {
        collisions.push(event.target);
      }
    });
  });
}
