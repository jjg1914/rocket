import {
  Engine,
  Assets,
  RuntimeModule,
  IntervalModule,
  RenderModule,
  InputModule,
} from "mu-engine";

import TestStage from "../assets/test-stage.tmx";
import Path1 from "../assets/path-1.json";
import Path2 from "../assets/path-2.json";

const assets = new Assets({
  "test-stage.tmx": { type: "stage", data: TestStage },
  "path-1.json": { type: "path", data: Path1 },
  "path-2.json": { type: "path", data: Path2 },
});

import BasicState from "./states/basic-state";

RuntimeModule((engine, cb) => {
  const canvas = document.getElementById("stage");
  const renderer = RenderModule(canvas, {
    width: 192,
    height: 144,
    smoothing: false,
    scale: 2,
  });

  IntervalModule(60, renderer(cb));
  InputModule(canvas, cb);

  engine.push(new BasicState("test-stage.tmx", assets));
});
