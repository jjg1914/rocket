import Runtime from "./engine/runtime";
import Interval from "./modules/interval";
import Render from "./modules/render";
import Input from "./modules/input";
import Rocket from "./rocket";

document.addEventListener("DOMContentLoaded", () => {
  Runtime(Rocket(), (cb) => {
    const canvas = document.getElementById("stage");
    const renderer = Render(canvas, {
      width: 192,
      height: 144,
      smoothing: false,
      scale: 2,
    });

    Interval(60, renderer(cb));
    Input(canvas, cb);
  });
});
