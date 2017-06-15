import {
  PositionComponent,
  MovementComponent,
  PathComponent,
  RenderComponent,
} from "mu-engine";

import Stage from "../util/stage";
import GrabComponent from "../components/grab-component";

export default class StageSystem {
  constructor(target, data) {
    this._target = target;
    this._stage = new Stage(data);
  }

  enter(event, engine) {
    engine.addEntity(this._target);

    this._stage.build(engine, {
      components: {
        position: PositionComponent,
        movement: MovementComponent,
        path: PathComponent,
        grab: GrabComponent,
        render: RenderComponent,
      },
    })
  }
}
