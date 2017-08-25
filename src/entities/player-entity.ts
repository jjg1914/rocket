import {
  PositionData,
  PositionComponent,
  MovementData,
  MovementComponent,
  RenderData,
  RenderComponent,
  CollisionSystem,
  MoveSystem,
  Control2WaySystem,
  CameraConfig,
  AccelSystem,
  CameraSystem,
  RenderSystem,
  BaseEntity,
} from "mu-engine";

import { GrabData, GrabComponent } from "../components/grab-component";
import { GrabSystem } from "../systems/grab-system";

export interface PlayerConfig {
  position: Partial<PositionData>;
  render: Partial<RenderData>;
  movement: Partial<MovementData>;
  grab: Partial<GrabData>;
}

export class PlayerEntity extends BaseEntity {
  position: PositionData;
  render: RenderData;
  movement: MovementData;
  grab: GrabData;
  control: { xAccel: number, jumpSpeed: number, jumpCutoff: number };

  constructor(config: Partial<PlayerConfig> & CameraConfig) {
    super();

    this.position = new PositionComponent(Object.assign({
      width: 16,
      height: 16,
    }, config.position));

    this.movement = new MovementComponent(Object.assign({
      restrict: [ 0, null ],
      xMax: 64,
      yMax: 224,
      friction: 128,
    }, config.movement));

    this.render = new RenderComponent(Object.assign({
      fill: "#00FF00",
      depth: 1,
    }, config.render));

    this.grab = new GrabComponent(config.grab);

    this.control = {
      xAccel: 192,
      jumpSpeed: 224,
      jumpCutoff: 100,
    };

    GrabSystem(this);
    Control2WaySystem(this);

    AccelSystem(this);
    MoveSystem(this);
    CollisionSystem(this);
    CameraSystem(this, config);
    RenderSystem(this);
  }
}
