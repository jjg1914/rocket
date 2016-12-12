import Engine from "./engine/engine";
import State from "./engine/state";

import PlayerEntity from "./entities/player-entity";
import RenderSystem from "./systems/render-system";
import MovementSystem from "./systems/movement-system";
import LandingSystem from "./systems/landing-system";
import CollisionSystem from "./systems/collision-system";
import ControlSystem from "./systems/control-system";
import CameraSystem from "./systems/camera-system";

import PositionComponent from "./components/position-component";
import MovementComponent from "./components/movement-component";
import PathComponent from "./components/path-component";

import Camera from "./util/camera";

export default function() {
  return (new Engine()).push(new State((s) => {
    let player = null;
    let camera = null;
    let bounds = {
      left: 0,
      top: 0,
      right: 384,
      bottom: 144,
    };
    let landing = LandingSystem();

    s.on("enter", (ev, engine) => {
      camera = new Camera(192, 144);
      player = PlayerEntity(engine.create(), 0, 112);

      engine.create().addComponent({
        position: new PositionComponent({
          y: 128,
          x: 0,
          width: 384,
          height: 16,
        }),
        solid: true,
      });

      engine.create().addComponent({
        position: new PositionComponent({
          y: 112,
          x: 192,
          width: 16,
          height: 16,
        }),
        solid: true,
      });

      engine.create().addComponent({
        position: new PositionComponent({
          x: 72,
          y: 120,
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

      engine.create().addComponent({
        position: new PositionComponent({
          x: 264,
          y: 88,
          width: 24,
          height: 8,
        }),
        movement: new MovementComponent({}),
        path: new PathComponent({
          path: [
            { t: 0,                    dx: 0,   dy: -64 },
            { t: 1500, x: 24,  y: -24, dx: 64,  dy: 0 },
            { t: 1500, x: 24,  y: 24,  dx: 0,   dy: 64 },
            { t: 1500, x: -24, y: 24,  dx: -64, dy: 0 },
            { t: 1500, x: -24, y: -24, dx: 0,   dy: -64 },
          ],
          repeat: true,
        }),
        solid: true,
      });
    });

    s.on("interval", (ev, engine) => {
      MovementSystem(ev, engine, bounds);
      landing(ev, engine, player);
      CollisionSystem(engine, bounds);
    });

    s.on("bump", (ev, engine) => {
      landing(ev, engine, player);
    });

    s.on("render", (ev, engine) => {
      ev.ctx.fillStyle = "white";
      ev.ctx.fillRect(0, 0, ev.width, ev.height);

      CameraSystem(engine, player, camera, bounds);
      RenderSystem(ev.ctx, engine, camera);
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
