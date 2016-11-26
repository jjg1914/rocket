import PositionComponent from "../components/position-component";
import MovementComponent from "../components/movement-component";
import ControlComponent from "../components/control-component";
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
      gravity: 192,
      friction: 128,
      xMax: 64,
      yMax: 192,
    }),
    control: new ControlComponent({
      xAccel: 192,
      jumpSpeed: 128,
    }),
  });
}
