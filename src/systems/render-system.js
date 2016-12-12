export default function RenderSystem(ctx, engine, camera) {
  let [ cameraX, cameraY ] = camera.position();

  ctx.fillStyle = "black";
 
  engine.run([ "position" ], (e) => {
    if (camera.isInView(e)) {
      ctx.fillRect(Math.floor(e.position.x - cameraX),
                   Math.floor(e.position.y - cameraY),
                   Math.floor(e.position.width),
                   Math.floor(e.position.height));
    }
  });
}
