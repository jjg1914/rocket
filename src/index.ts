import {
  Assets,
  StackEntity,
  RenderMediatorSystem,
  IntervalSystem,
  InputSystem,
} from "mu-engine";

import TestStage from "../assets/test-stage.tmx";
import * as Tileset from "../assets/tileset.json";
import * as Spikes from "../assets/spikes.json";
import * as Block from "../assets/block.json";
import * as Player from "../assets/player.json";
import Stage1 from "../assets/stage1.tmx";
import Stage2 from "../assets/stage2.tmx";
import * as Path1 from "../assets/path-1.json";
import * as Path2 from "../assets/path-2.json";

const assets = new Assets({
  preload: true,
  assets: {
    "test-stage.tmx": { type: "stage", data: TestStage },
    "tileset.json": { type: "tileset", data: Tileset },
    "spikes.json": { type: "sprite", data: Spikes },
    "block.json": { type: "sprite", data: Block },
    "player.json": { type: "sprite", data: Player },
    "stage1.tmx": { type: "stage", data: Stage1 },
    "stage2.tmx": { type: "stage", data: Stage2 },
    "path-1.json": { type: "path", data: Path1 },
    "path-2.json": { type: "path", data: Path2 },
  }
});

import { GrabEntity } from "./entities/grab-entity";
import { FloorEntity } from "./entities/floor-entity";
import { PlatformEntity } from "./entities/platform-entity";
import { PathPlatformEntity } from "./entities/path-platform-entity";
import { FallingPlatformEntity } from "./entities/falling-platform-entity";
import { PhasePlatformEntity } from "./entities/phase-platform-entity";
import { SpikesEntity } from "./entities/spikes-entity";

import { StageMenuEntity } from "./entities/stage-menu-entity";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("stage");

  if (canvas != null) {
    const stack = new StackEntity();
    stack.push(new StageMenuEntity({
      assets: assets,
      entities: {
        default: FloorEntity,
        floor: FloorEntity,
        "platform": PlatformEntity,
        "path-platform": PathPlatformEntity,
        "falling-platform": FallingPlatformEntity,
        "phase-platform": PhasePlatformEntity,
        grab: GrabEntity,
        spikes: SpikesEntity,
      },
    }));

    InputSystem(stack, { canvas: canvas });
    IntervalSystem(stack, { fps: 60 });
    RenderMediatorSystem(stack, {
      canvas: canvas as HTMLCanvasElement,
      assets: assets,
      width: 192,
      height: 144,
      smoothing: false,
      scale: 2,
      background: "#FFFFFF",
    });
  }
});
