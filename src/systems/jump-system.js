import { Keys } from "../modules/input";

export default function JumpSystem(state, target) {
  state.on("keydown", (event, engine) => {
    engine.run(target, [ "control", "movement", "position" ], (e) => {
      if (event.which === Keys.ARROW_UP && e.position.landing != null) {
        e.movement.ySpeed = -e.control.jumpSpeed;
        e.position.landing = null;
      }
    });
  });
}
