import { Keys } from "mu-engine";

export default class JumpSystem {
  constructor(target) {
    this._target = target;
  }

  keydown(event, engine) {
    engine.run(this._target, [ "control", "movement", "position" ], (e) => {
      if (event.which === Keys.ARROW_UP && e.position.landing != null) {
        e.movement.ySpeed = -e.control.jumpSpeed;
        e.position.landing = null;
      }
    });
  }
}
