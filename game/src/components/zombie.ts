import chroma from "chroma-js";

import type { Entity } from "../entities";
import type { World } from "../world";
import { Color } from "./color";
import { Component } from "./component";
import { FollowEntity } from "./follow-entity";

export class Zombie extends Component {
  constructor() {
    super("Zombie");
  }

  public override onAwake(entity: Entity, world: World): void {
    const color = world.getComponent(entity.id, Color);
    const followEntity = world.getComponent(entity.id, FollowEntity);

    if (!color) return;

    if (!followEntity) {
      world.addComponent(entity.id, new FollowEntity(-1));
    }

    color.value = this.zombifyColor(color.value);
  }

  private zombifyColor(color: string) {
    return chroma(color)
      .set("hsl.h", 120) // Shift hue towards green
      .set("hsl.s", "*0.5") // Reduce saturation by half
      .set("hsl.l", "+0.1") // Lighten slightly
      .hex(); // Return the resulting color in HEX
  }

  public toJSON() {
    return { ...super.toJSON() };
  }

  public static fromJSON() {
    return new Zombie();
  }
}
