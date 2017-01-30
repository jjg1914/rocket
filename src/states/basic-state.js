import State from "../engine/state";

import PlayerEntity from "../entities/player-entity";

import RenderSystem from "../systems/render-system";
import MovementSystem from "../systems/movement-system";
import LandingSystem from "../systems/landing-system";
import CollisionSystem from "../systems/collision-system";
import GrabSystem from "../systems/grab-system";
import JumpSystem from "../systems/jump-system";
import ControlSystem from "../systems/control-system";
import CameraSystem from "../systems/camera-system";
import StageSystem from "../systems/stage-system";

import Camera from "../util/camera";

export default class BasicState extends State {
  constructor(stage) {
    super();

    const camera = new Camera(192, 144);
    const bounds = { left: 0, top: 0, right: 384, bottom: 144 };

    const player = new PlayerEntity(0, 112);

    this.addSystem(new StageSystem(player, stage));

    this.addSystem(new MovementSystem(bounds, 208));
    this.addSystem(new CollisionSystem(bounds));
    this.addSystem(new LandingSystem());

    this.addSystem(new ControlSystem(player));
    this.addSystem(new GrabSystem(player));
    this.addSystem(new JumpSystem(player));

    this.addSystem(new CameraSystem(camera, player, bounds));
    this.addSystem(new RenderSystem(camera));
  }
}
