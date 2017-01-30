import { shapeFor } from "../util/shape";

export default class LandingSystem {
  constructor() {
    this._bumps = {};
  }

  postcollision(event, engine) {
    engine.run([ "position" ], (e) => {
      const b1 = shapeFor(e).bounds();
      b1.bottom += 1;
      b1.top = b1.bottom;
      const s = (e.position.landing == null ? this._bumps[e.meta.id] :
                 event.data.queryBounds(b1, e.meta.id).map((f) => f.entity));

      let d = -Infinity;
      let m = null;

      engine.run(s, [ "position" ], (f) => {
        const b2 = shapeFor(f).bounds();
        const v = Math.abs(Math.min(b1.right, b2.right) -
                           Math.max(b1.left, b2.left));
        if (v > d) {
          d = v;
          m = f;
        }
      });

      e.position.landing = m;
    });

    this._bumps = {};
  }

  bump(event, engine) {
    if (event.mtv[1] > 0) {
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
