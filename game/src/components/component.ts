import { ComponentMask } from '.';

export abstract class Component {
  private readonly mask: number;

  constructor(mask: keyof typeof ComponentMask) {
    this.mask = ComponentMask[mask];
  }

  public getMask() {
    return this.mask;
  }

  public toJSON() {
    return { name: this.constructor.name };
  }

  public static fromJSON(args: unknown) {}
}
