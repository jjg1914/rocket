import Engine from "./engine/engine";
import State from "./engine/state";

import PlayerEntity from "./entities/player-entity";
import RenderSystem from "./systems/render-system";
import MovementSystem from "./systems/movement-system";
import LandingSystem from "./systems/landing-system";
import CollisionSystem from "./systems/collision-system";
import ControlSystem from "./systems/control-system";

import PositionComponent from "./components/position-component";
import MovementComponent from "./components/movement-component";
import PathComponent from "./components/path-component";

export default function() {
  return (new Engine()).push(new State((s) => {
    let player = null;
    let landing = LandingSystem();

    s.on("enter", (ev, engine) => {
      player = PlayerEntity(engine.create(), 0, 112);

      engine.create().addComponent({
        position: new PositionComponent({
          y: 128,
          x: 0,
          width: 192,
          height: 16,
        }),
        solid: true,
      });

      engine.create().addComponent({
        position: new PositionComponent({
          y: 120,
          x: 72,
          width: 24,
          height: 8,
        }),
        movement: new MovementComponent({}),
        path: new PathComponent({
          path: [
            { t: 2500, y: -64, linear: true },
            { t: 2500, x: 64, linear: true },
            { t: 2500, y: 64, linear: true },
            { t: 2500, x: -64, linear: true },
          ],
          repeat: true,
        }),
        solid: true,
      });
    });

    s.on("interval", (ev, engine) => {
      MovementSystem(ev, engine);
      landing(ev, engine, player);
      CollisionSystem(engine);
    });

    s.on("bump", (ev, engine) => {
      landing(ev, engine, player);
    });

    s.on("render", (ev, engine) => {
      ev.ctx.fillStyle = "white";
      ev.ctx.fillRect(0, 0, ev.width, ev.height);

      RenderSystem(ev.ctx, engine);
    });

    s.on("keydown", (ev, engine) => {
      ControlSystem(ev, engine, player);
    });

    s.on("keyup", (ev, engine) => {
      ControlSystem(ev, engine, player);
    });

    s.on("error", (error) => {
      console.error(error);
    });
  }));
}
