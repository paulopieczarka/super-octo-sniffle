export const ComponentMask = {
  Position: 1 << 0,
  Dimension: 1 << 1,
  Color: 1 << 2,
  TargetPosition: 1 << 3,
} as const;

// export type NetworkState = 'synced' | 'dirty' | 'removed';

export abstract class Component {
  private readonly mask: number;

  // public networkState: NetworkState = 'synced';

  constructor(mask: keyof typeof ComponentMask) {
    this.mask = ComponentMask[mask];
  }

  public getMask() {
    return this.mask;
  }

  // public isDirty() {
  //   return this.networkState === 'dirty';
  // }

  // public isRemoved() {
  //   return this.networkState === 'removed';
  // }

  public toJSON() {
    return { name: this.constructor.name };
  }

  public static fromJSON(args: any) {}
}

export class Position extends Component {
  constructor(public x: number, public y: number) {
    super('Position');
  }

  public toJSON() {
    return { ...super.toJSON(), x: this.x, y: this.y };
  }

  public static fromJSON({ x, y }: { x: number, y: number }) {
    return new Position(x, y);
  }
}

export class Color extends Component {
  constructor(public value: string) {
    super('Color');
  }

  public toJSON() {
    return { ...super.toJSON(), value: this.value };
  }

  public static fromJSON({ value }: { value: string }) {
    return new Color(value);
  }
}

export class Dimension extends Component {
  constructor(public width: number, public height: number) {
    super('Dimension');
  }

  public toJSON() {
    return { ...super.toJSON(), width: this.width, height: this.height };
  }

  public static fromJSON({ width, height }: { width: number, height: number }) {
    return new Dimension(width, height);
  }
}

export class TargetPosition extends Component {
  constructor(public x: number, public y: number) {
    super('TargetPosition');
  }

  public toJSON() {
    return { ...super.toJSON(), x: this.x, y: this.y };
  }

  public static fromJSON({ x, y }: { x: number, y: number }) {
    return new TargetPosition(x, y);
  }
}

export const componentMap = {
  Position: Position,
  Dimension: Dimension,
  Color: Color,
  TargetPosition: TargetPosition,
};
