export default function RenderSystem(ctx, engine) {
  ctx.fillStyle = "black";
 
  engine.run([ "position" ], (e) => {
    ctx.fillRect(Math.floor(e.position.x),
                 Math.floor(e.position.y),
                 Math.floor(e.position.width),
                 Math.floor(e.position.height));
  });
}
