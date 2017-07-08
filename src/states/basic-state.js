import {
  State,
  Camera,
  Path,
  RenderSystem,
  MovementSystem,
  CollisionSystem,
  CameraSystem,
  PositionComponent,
  MovementComponent,
  PathComponent,
  RenderComponent,
} from "mu-engine";

import PlayerEntity from "../entities/player-entity";

import LandingSystem from "../systems/landing-system";
import GrabSystem from "../systems/grab-system";
import JumpSystem from "../systems/jump-system";
import ControlSystem from "../systems/control-system";

import GrabComponent from "../components/grab-component";

export default class BasicState extends State {
  constructor(stageName, assets) {
    super();

    this._assets = assets;
    this._stage = assets.load(stageName);

    this.addSystem(new MovementSystem(this._stage.bounds(), 208));
    this.addSystem(new CollisionSystem(this._stage.bounds()));
    this.addSystem(new LandingSystem());

    this._player = new PlayerEntity(320, 112);

    this.addSystem(new ControlSystem(this._player));
    this.addSystem(new GrabSystem(this._player));
    this.addSystem(new JumpSystem(this._player));

    this._camera = new Camera(192, 144);

    this.addSystem(new CameraSystem(this._camera, 
                                    this._player,
                                    this._stage.bounds()));
    this.addSystem(new RenderSystem(this._camera));
  }

  enter(event, engine) {
    engine.addEntity(this._player);

    const entities = this._stage.build(engine, {
      assets: this._assets,
      components: {
        position: PositionComponent,
        movement: MovementComponent,
        path: PathComponent,
        grab: GrabComponent,
        render: RenderComponent,
      },
    });

    engine.run(entities, [ "path", "position" ], (e) => {
      if (e.path.path instanceof Path) {
        e.path.path.reorigin(e.position.x, e.position.y);
      }
    });
  }
}
