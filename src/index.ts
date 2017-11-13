import {
  Assets,
  StackEntity,
  RenderMediatorSystem,
  IntervalSystem,
  InputSystem,
} from "mu-engine";

import TestStage from "../assets/stages/test-stage.tmx";
import Stage1 from "../assets/stages/stage1.tmx";
import Stage2 from "../assets/stages/stage2.tmx";
import Stage3 from "../assets/stages/stage3.tmx";
import Stage3a from "../assets/stages/stage3a.tmx";

import * as Tileset from "../assets/tilesets/tileset.json";

import * as Spikes from "../assets/sprites/spikes.json";
import * as Fruit from "../assets/sprites/fruit.json";
import * as Block from "../assets/sprites/block.json";
import * as Player from "../assets/sprites/player.json";
import * as Spring from "../assets/sprites/spring.json";
import * as Platform from "../assets/sprites/platform.json";
import * as Grabbable from "../assets/sprites/grabbable.json";
import * as Keys from "../assets/sprites/keys.json";
import * as Locks from "../assets/sprites/locks.json";

import * as Path1 from "../assets/paths/path-1.json";
import * as Path2 from "../assets/paths/path-2.json";

const assets = new Assets({
  preload: true,
  assets: {
    "test-stage.tmx": { type: "stage", data: TestStage },
    "stage1.tmx": { type: "stage", data: Stage1 },
    "stage2.tmx": { type: "stage", data: Stage2 },
    "stage3.tmx": { type: "stage", data: Stage3 },
    "stage3a.tmx": { type: "stage", data: Stage3a },
    "tileset.json": { type: "tileset", data: Tileset },
    "spikes.json": { type: "sprite", data: Spikes },
    "fruit.json": { type: "sprite", data: Fruit },
    "block.json": { type: "sprite", data: Block },
    "player.json": { type: "sprite", data: Player },
    "spring.json": { type: "sprite", data: Spring },
    "platform.json": { type: "sprite", data: Platform },
    "grabbable.json": { type: "sprite", data: Grabbable },
    "keys.json": { type: "sprite", data: Keys },
    "locks.json": { type: "sprite", data: Locks },
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
import { OscillatePlatformEntity } from "./entities/oscillate-platform-entity";
import { SpikesEntity } from "./entities/spikes-entity";
import { FruitEntity } from "./entities/fruit-entity";
import { SpringEntity } from "./entities/spring-entity";
import { DoorEntity } from "./entities/door-entity";
import { KeyEntity } from "./entities/key-entity";
import { LockEntity } from "./entities/lock-entity";

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
        platform: PlatformEntity,
        "path-platform": PathPlatformEntity,
        "falling-platform": FallingPlatformEntity,
        "phase-platform": PhasePlatformEntity,
        "oscillate-platform": OscillatePlatformEntity,
        grab: GrabEntity,
        spikes: SpikesEntity,
        fruit: FruitEntity,
        spring: SpringEntity,
        door: DoorEntity,
        key: KeyEntity,
        lock: LockEntity,
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
