import PositionComponent from "../components/position-component";
import MovementComponent from "../components/movement-component";
import ControlComponent from "../components/control-component";
import RenderComponent from "../components/render-component";

export default class PlayerEntity {
  constructor(x, y) {
    this.position = new PositionComponent({
      x: x,
      y: y,
      width: 16,
      height: 16,
    });

    this.movement = new MovementComponent({
      restrict: true,
      xMax: 64,
      yMax: 192,
      friction: 128,
    });

    this.control = new ControlComponent({
      xAccel: 192,
      jumpSpeed: 160,
    });

    this.render = new RenderComponent({
      fill: "#00FF00",
    });
  }
}
