import { Shape } from "mu-engine";

export default class LandingSystem {
  constructor() {
    this._bumps = {};
  }

  postcollision(event, engine) {
    engine.run([ "position" ], (e) => {
      const b1 = Shape.shapeFor(e).bounds();
      b1.top = b1.bottom + 1;
      b1.bottom += 2;
      const s = (e.position.landing == null ? this._bumps[e.meta.id] :
                 event.data.queryBounds(b1, e.meta.id).map((f) => f.entity));

      let d = -Infinity;
      let d2 = Infinity;
      let m = null;

      engine.run(s, [ "position" ], (f) => {
        const shape = Shape.shapeFor(f);       
        const bounds = Shape.shapeFor(e).bounds();
        const min = shape.minimum(bounds.left, bounds.right);

        const b2 = Shape.shapeFor(f).bounds();
        const v = Math.abs(Math.min(b1.right, b2.right) -
                           Math.max(b1.left, b2.left));
        if (min < d2 || v > d) {
          d = v;
          d2 = min;
          m = f;
        }
      });

      e.position.landing = m;
    });

    this._bumps = {};
  }

  bump(event, engine) {
    if (event.mtv[1] <= 0) {
      engine.run(event.entity, [ "position" ], (e) => {
        engine.run(event.target, [ "position" ], (f) => {
          if (this._bumps[e.meta.id] == null) {
            this._bumps[e.meta.id] = [ f ];
          } else {
            this._bumps[e.meta.id].push(f);
          }
        });
      });
    }
  }
}
