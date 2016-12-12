import { shapeFor } from "../util/shape";

export default function CameraSystem(engine, target, camera, bounds) {
  engine.run(target, [ "position" ], (e) => {
    const targetBounds = shapeFor(e).bounds();
    const [ cameraW, cameraH ] = camera.dimensions();

    let [ x, y ] = [
      (targetBounds.left + targetBounds.right) / 2,
      (targetBounds.top + targetBounds.bottom) / 2,
    ];

    x -= cameraW / 2;
    y -= cameraH / 2;

    x = Math.min(Math.max(x, bounds.left), bounds.right - cameraW);
    y = Math.min(Math.max(y, bounds.top), bounds.bottom - cameraH);

    camera.position(x, y);
  });
}
