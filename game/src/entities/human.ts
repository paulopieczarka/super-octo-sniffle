import {
  Color,
  type Component,
  Depth,
  Dimension,
  Position,
} from "../components";
import { Entity } from "./entity";

export class Human extends Entity {
  constructor(name = "Generic Human") {
    super(name);
  }

  public initialize(params: { x: number; y: number; color: string }) {
    return new Set<Component>([
      new Position(params.x, params.y),
      new Dimension(6, 10),
      new Color(params.color),
      new Depth(),
    ]);
  }
}
