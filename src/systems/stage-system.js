import Stage from "../util/stage";

import PositionComponent from "../components/position-component";
import MovementComponent from "../components/movement-component";
import PathComponent from "../components/path-component";
import GrabComponent from "../components/grab-component";
import RenderComponent from "../components/render-component";

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
