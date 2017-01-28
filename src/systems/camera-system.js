import { shapeFor } from "../util/shape";

export default function CameraSystem(state, target, camera, bounds) {
  state.on("render", (event, engine) => {
    engine.run(target, [ "position" ], (e) => {
      const targetBounds = shapeFor(e).bounds();
      const [ cameraW, cameraH ] = camera.dimensions();

      let [ x, y ] = [
        (targetBounds.left + targetBounds.right) / 2,
        (targetBounds.top + targetBounds.bottom) / 2,
      ];

      x -= cameraW / 2;
      y -= cameraH / 2;

      x = Number((Math.floor(x) + (targetBounds.left % 1)).toFixed(4));
      y = Number((Math.floor(y) + (targetBounds.top % 1)).toFixed(4));

      x = Math.min(Math.max(x, bounds.left), bounds.right - cameraW);
      y = Math.min(Math.max(y, bounds.top), bounds.bottom - cameraH);

      camera.position(x, y);
    });
  });
}
