import { Keys, Shape } from "mu-engine";

export default class GrabSystem {
  constructor(target) {
    this._target = target;
    this._collisions = [];
  }

  interval(event, engine) {
    this._collisions.length = 0;

    engine.run(this._target, [ "control", "position" ], (e) => {
      engine.run(e.control.grabed, [ "position" ], (f) => {
        let b = Shape.shapeFor(e).bounds();
        let c = Shape.shapeFor(f).bounds();

        f.position.x = ((b.right + b.left) / 2) - ((c.right - c.left) / 2);
        f.position.y = b.top - (c.bottom - c.top);
        f.position.ignoreSolid = true;
      });
    });
  }

  keydown(event, engine) {
    if (event.which === Keys.ARROW_DOWN) {
      engine.run(this._target, [ "control" ], (e) => {
        engine.run(this._collisions, [ "grab" ], (f) => {
          e.control.grabed = f;
        });
      });
    }
  }

  collision(event, engine) {
    engine.run(this._target, [], (e) => {
      if (event.entity.meta.id === e.meta.id) {
        this._collisions.push(event.target);
      }
    });
  }
}
