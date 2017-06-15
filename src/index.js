import {
  Engine,
  IntervalModule,
  RenderModule,
  InputModule,
} from "mu-engine";

import BasicState from "./states/basic-state";
import TestStage from "./stages/test-stage";

document.addEventListener("DOMContentLoaded", () => {
  new Engine((cb, engine) => {
    const canvas = document.getElementById("stage");
    const renderer = RenderModule(canvas, {
      width: 192,
      height: 144,
      smoothing: false,
      scale: 2,
    });

    IntervalModule(60, renderer(cb));
    InputModule(canvas, cb);

    engine.push(new BasicState(TestStage));
  });
});
