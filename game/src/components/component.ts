import type { Item } from "../items";

export const ComponentMask = {
  Position: 1 << 0,
  Dimension: 1 << 1,
  Color: 1 << 2,
  TargetPosition: 1 << 3,
  Shape: 1 << 4,
  FollowEntity: 1 << 5,
  Depth: 1 << 6,
  Resource: 1 << 7,
} as const;

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

export class Position extends Component {
  constructor(
    public x: number,
    public y: number,
  ) {
    super("Position");
  }

  public toJSON() {
    return { ...super.toJSON(), x: this.x, y: this.y };
  }

  public static fromJSON({ x, y }: { x: number; y: number }) {
    return new Position(x, y);
  }
}

export class Color extends Component {
  constructor(public value: string) {
    super("Color");
  }

  public toJSON() {
    return { ...super.toJSON(), value: this.value };
  }

  public static fromJSON({ value }: { value: string }) {
    return new Color(value);
  }
}

export class Depth extends Component {
  constructor(
    public top = 0,
    public bottom = 0,
  ) {
    super("Depth");
  }

  public toJSON() {
    return { ...super.toJSON(), top: this.top, bottom: this.bottom };
  }

  public static fromJSON({ top, bottom }: { top: number; bottom: number }) {
    return new Depth(top, bottom);
  }
}

export class Dimension extends Component {
  constructor(
    public width: number,
    public height: number,
  ) {
    super("Dimension");
  }

  public toJSON() {
    return { ...super.toJSON(), width: this.width, height: this.height };
  }

  public static fromJSON({ width, height }: { width: number; height: number }) {
    return new Dimension(width, height);
  }
}

export class TargetPosition extends Component {
  constructor(
    public x: number,
    public y: number,
  ) {
    super("TargetPosition");
  }

  public toJSON() {
    return { ...super.toJSON(), x: this.x, y: this.y };
  }

  public static fromJSON({ x, y }: { x: number; y: number }) {
    return new TargetPosition(x, y);
  }
}

type Polygon = {
  type: "polygon";
  coordinates: Array<{ x: number; y: number }>;
  fillStyle: "componentColor" | string;
  strokeStyle?: string;
  lineWidth?: number;
};

export class Shape extends Component {
  constructor(public data: Polygon[]) {
    super("Shape");
  }

  public toJSON() {
    return { ...super.toJSON(), data: this.data };
  }

  public static fromJSON({
    data,
  }: Omit<ReturnType<typeof Shape.prototype.toJSON>, "name">) {
    return new Shape(data);
  }
}

export class FollowEntity extends Component {
  constructor(
    public entityId: number,
    public radius = 0,
  ) {
    super("FollowEntity");
  }

  public toJSON() {
    return { ...super.toJSON(), entityId: this.entityId, radius: this.radius };
  }

  public static fromJSON({
    entityId,
    radius,
  }: Omit<ReturnType<typeof FollowEntity.prototype.toJSON>, "name">) {
    return new FollowEntity(entityId, radius);
  }
}

export class Resource extends Component {
  constructor(
    public readonly item: Item,
    public amount = 1,
  ) {
    super("Resource");
  }

  public toJSON() {
    return { ...super.toJSON(), item: this.item, amount: this.amount };
  }

  public static fromJSON({
    item,
    amount,
  }: Omit<ReturnType<typeof Resource.prototype.toJSON>, "name">) {
    return new Resource(item, amount);
  }
}

export class Inventory extends Component {
  constructor(public slots = 1) {
    super("Resource");
  }

  public toJSON() {
    return { ...super.toJSON(), slots: this.slots };
  }

  public static fromJSON({
    item,
    amount,
  }: Omit<ReturnType<typeof Resource.prototype.toJSON>, "name">) {
    return new Resource(item, amount);
  }
}

export class TaskGatherItem extends Component {
  constructor(
    public entityId: number,
    public radius = 0,
  ) {
    super("FollowEntity");
  }

  public toJSON() {
    return { ...super.toJSON(), entityId: this.entityId, radius: this.radius };
  }

  public static fromJSON({
    entityId,
    radius,
  }: Omit<ReturnType<typeof FollowEntity.prototype.toJSON>, "name">) {
    return new FollowEntity(entityId, radius);
  }
}

export const componentMap = {
  Position,
  Dimension,
  Color,
  TargetPosition,
  Shape,
  FollowEntity,
  Depth,
  Resource,
};
