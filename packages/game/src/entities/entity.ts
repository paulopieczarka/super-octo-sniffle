import {
  Color,
  type Component,
  Depth,
  Dimension,
  Position,
} from "../components";

export abstract class Entity {
  private static nextId = 0;

  public readonly id: number;

  constructor(public name: Readonly<string>) {
    this.id = Entity.nextId++;
  }

  /** @return {number} entity id */
  public abstract initialize(param?: Record<string, unknown>): Set<Component>;
}

export class Human extends Entity {
  constructor() {
    super("Human");
  }

  public initialize(params: { x: number; y: number; color: string }) {
    return new Set([
      new Position(params.x, params.y),
      new Dimension(6, 10),
      new Color(params.color),
      new Depth(),
    ]);
  }
}
