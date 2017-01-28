import PositionComponent from "../components/position-component";
import MovementComponent from "../components/movement-component";
import ControlComponent from "../components/control-component";
import RenderComponent from "../components/render-component";
import Entity from "../engine/entity";

export default function PlayerEntity(entity, x, y) {
  return entity.addComponent({
    position: new PositionComponent({
      x: x,
      y: y,
      width: 16,
      height: 16,
    }),
    movement: new MovementComponent({
      restrict: true,
      xMax: 64,
      yMax: 192,
      friction: 128,
    }),
    control: new ControlComponent({
      xAccel: 192,
      jumpSpeed: 160,
    }),
    render: new RenderComponent({
      fill: "#00FF00",
    }),
  });
}
