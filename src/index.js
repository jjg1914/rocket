import Engine from "./engine/engine";
import Interval from "./modules/interval";
import Render from "./modules/render";
import Input from "./modules/input";

import BasicState from "./states/basic-state";
import TestStage from "./stages/test-stage";

document.addEventListener("DOMContentLoaded", () => {
  new Engine((cb, engine) => {
    const canvas = document.getElementById("stage");
    const renderer = Render(canvas, {
      width: 192,
      height: 144,
      smoothing: false,
      scale: 2,
    });

    Interval(60, renderer(cb));
    Input(canvas, cb);

    engine.push(new BasicState(TestStage));
  });
});
