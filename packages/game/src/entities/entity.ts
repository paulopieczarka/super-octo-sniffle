import type {
  Component,
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
