import { ComponentMask } from ".";
import type { Entity } from "../entities";
import type { World } from "../world";

export abstract class Component {
  private readonly mask: number;

  constructor(mask: keyof typeof ComponentMask) {
    this.mask = ComponentMask[mask];
  }

  public onAwake(entity: Entity, world: World) {}

  public getMask() {
    return this.mask;
  }

  public toJSON() {
    return { name: this.constructor.name };
  }

  public static fromJSON(args: unknown) {}
}
