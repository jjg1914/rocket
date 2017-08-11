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
  mixin,
} from "mu-engine";

import { GrabData, GrabComponent } from "../components/grab-component";
import { GrabSystem } from "../systems/grab-system";

export interface PlayerConfig extends CameraConfig {
  position: PositionData;
  render: RenderData;
  movement: MovementData;
  grab: GrabData;
}

export const PlayerEntity = mixin([
  Control2WaySystem,
  CameraSystem,
  RenderSystem,
  GrabSystem,
  CollisionSystem,
  MoveSystem,
  AccelSystem,
], class extends BaseEntity {
  position: PositionData;
  render: RenderData;
  movement: MovementData;
  grab: GrabData;
  control: { xAccel: number, jumpSpeed: number };

  constructor(config: PlayerConfig) {
    super();

    this.position = new PositionComponent(Object.assign({
      width: 16,
      height: 16,
    }, config.position));

    this.movement = new MovementComponent(Object.assign({
      restrict: true,
      xMax: 64,
      yMax: 192,
      friction: 128,
    }, config.movement));

    this.render = new RenderComponent(Object.assign({
      fill: "#00FF00",
    }, config.render));

    this.grab = new GrabComponent(config.grab);

    this.control = {
      xAccel: 192,
      jumpSpeed: 160,
    };
  }
});
