import { World } from "@hagokia/game";
import { TargetPosition } from "@hagokia/game/components";
import {
  Bear,
  Campfire,
  Farm,
  Human,
  Rock,
  Sheep,
  Tree,
} from "@hagokia/game/entities";
import { Movement } from "@hagokia/game/systems";
import { FollowEntity } from "@hagokia/game/components";
import {
  DepthCalculation,
  WanderAround,
} from "../../../game/src/systems/system";

export class WorldServer extends World {
  constructor() {
    super();

    this.addSystem(new Movement());
    this.addSystem(new WanderAround());
    this.addSystem(new DepthCalculation());

    const redCampfireEntity = this.spawn(Campfire, {
      x: 235,
      y: 238,
      color: "#de523e",
    });

    this.spawn(Farm, {
      x: 335,
      y: 238,
      color: "#de523e",
    });

    const yellowCampfireEntity = this.spawn(Campfire, {
      x: 400,
      y: 400,
      color: "#f0b541",
    });

    this.spawn(Farm, {
      x: 530,
      y: 400,
      color: "#f0b541",
    });

    for (let i = 0; i < 50; i++) {
      const rx = Math.random() * 1024;
      const ry = Math.random() * 1024;

      this.spawn(Rock, { x: rx, y: ry });
    }

    for (let i = 0; i < 10; i++) {
      const rx = Math.random() * 1024;
      const ry = Math.random() * 1024;

      this.spawn(Human, { x: rx, y: ry, color: "#de523e" }, [
        new TargetPosition(rx, ry),
        new FollowEntity(redCampfireEntity.id, 128),
      ]);
    }

    for (let i = 0; i < 10; i++) {
      const rx = Math.random() * 1024;
      const ry = Math.random() * 1024;

      this.spawn(Human, { x: rx, y: ry, color: "#f0b541" }, [
        new TargetPosition(rx, ry),
        new FollowEntity(yellowCampfireEntity.id, 128),
      ]);
    }

    const brx = Math.random() * 1024;
    const bry = Math.random() * 1024;

    const leadBearEntity = this.spawn(Bear, { x: brx, y: bry }, [
      new TargetPosition(brx, bry),
    ]);

    for (let i = 0; i < 4; i++) {
      this.spawn(Bear, { x: brx, y: bry }, [
        new TargetPosition(brx, bry),
        new FollowEntity(leadBearEntity.id, 64),
      ]);
    }

    for (let i = 0; i < 10; i++) {
      const srx = Math.random() * 1024;
      const sry = Math.random() * 1024;

      const leadSheepEntity = this.spawn(Sheep, { x: srx, y: sry }, [
        new TargetPosition(srx, sry),
      ]);

      for (let i = 0; i < 4; i++) {
        this.spawn(Sheep, { x: srx, y: sry }, [
          new TargetPosition(srx, sry),
          new FollowEntity(leadSheepEntity.id, 16),
        ]);
      }
    }

    for (let i = 0; i < 100; i++) {
      const srx = Math.random() * 1024;
      const sry = Math.random() * 1024;

      this.spawn(Tree, { x: srx, y: sry });
    }
  }
}
