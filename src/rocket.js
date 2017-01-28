import Engine from "./engine/engine";
import State from "./engine/state";

import PlayerEntity from "./entities/player-entity";
import RenderSystem from "./systems/render-system";
import MovementSystem from "./systems/movement-system";
import LandingSystem from "./systems/landing-system";
import CollisionSystem from "./systems/collision-system";
import GrabSystem from "./systems/grab-system";
import JumpSystem from "./systems/jump-system";
import ControlSystem from "./systems/control-system";
import CameraSystem from "./systems/camera-system";

import PositionComponent from "./components/position-component";
import MovementComponent from "./components/movement-component";
import PathComponent from "./components/path-component";
import GrabComponent from "./components/grab-component";
import RenderComponent from "./components/render-component";

import Camera from "./util/camera";

export default function() {
  return (new Engine()).push(new State((s) => {
    s.on("enter", (ev, engine) => {
      const player = PlayerEntity(engine.create(), 0, 112);
      const camera = new Camera(192, 144);
      const bounds = { left: 0, top: 0, right: 384, bottom: 144 };

      MovementSystem(s, bounds, 208);
      CollisionSystem(s, bounds);
      LandingSystem(s);

      GrabSystem(s, player);
      JumpSystem(s, player);
      ControlSystem(s, player);

      CameraSystem(s, player, camera, bounds);
      RenderSystem(s, camera);

      engine.create().addComponent({
        position: new PositionComponent({
          y: 128,
          x: 0,
          width: 384,
          height: 16,
          solid: true,
        }),
        render: new RenderComponent(),
      });

      engine.create().addComponent({
        position: new PositionComponent({
          y: 112,
          x: 192,
          width: 16,
          height: 16,
          solid: true,
        }),
        render: new RenderComponent(),
      });

      engine.create().addComponent({
        position: new PositionComponent({
          y: 96,
          x: 192,
          width: 16,
          height: 16,
        }),
        grab: true,
        render: new RenderComponent({ fill: "#FF0000" }),
      });

      engine.create().addComponent({
        position: new PositionComponent({
          x: 72,
          y: 120,
          width: 24,
          height: 8,
          solid: [  NaN, 1 ],
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
        render: new RenderComponent({ fill: "#0000FF" }),
      });

      engine.create().addComponent({
        position: new PositionComponent({
          x: 264,
          y: 88,
          width: 24,
          height: 8,
          solid: true,
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
        render: new RenderComponent({ fill: "#0000FF" }),
      });
    });

    s.on("error", (error) => {
      console.error(error);
    });
  }));
}
