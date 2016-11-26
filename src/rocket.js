import Engine from "./engine/engine";
import State from "./engine/state";

import PlayerEntity from "./entities/player-entity";
import RenderSystem from "./systems/render-system";
import MovementSystem from "./systems/movement-system";
import CollisionSystem from "./systems/collision-system";
import ControlSystem from "./systems/control-system";

import PositionComponent from "./components/position-component";

export default function() {
  return (new Engine()).push(new State((s) => {
    let player = null;

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
          y: 112,
          x: 88,
          width: 16,
          height: 16,
        }),
        solid: true,
      });
    });

    s.on("interval", (ev, engine) => {
      MovementSystem(ev, engine);
      CollisionSystem(engine);
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
