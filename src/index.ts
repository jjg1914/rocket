import { Assets } from "mu-engine";

import TestStage from "../assets/test-stage.tmx";
import * as Path1 from "../assets/path-1.json";
import * as Path2 from "../assets/path-2.json";

const assets = new Assets({
  "test-stage.tmx": { type: "stage", data: TestStage },
  "path-1.json": { type: "path", data: Path1 },
  "path-2.json": { type: "path", data: Path2 },
});

import { StageEntity } from "./entities/stage-entity";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("stage");

  if (canvas != null) {
    new StageEntity({
      assets: assets,
      stage: "test-stage.tmx",
      interval: { fps: 60 },
      input: {
        canvas: canvas,
      },
      render: {
        canvas: canvas as HTMLCanvasElement,
        width: 192,
        height: 144,
        smoothing: false,
        scale: 2,
        background: "#FFFFFF",
      },
    });
  }
});
