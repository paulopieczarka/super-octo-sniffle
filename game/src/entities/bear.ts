import { Color, Depth, Dimension, Position } from "../components";
import { Entity } from "./entity";

export class Bear extends Entity {
  constructor() {
    super("Bear");
  }

  public initialize(params: { x: number; y: number }) {
    return new Set([
      new Position(params.x, params.y),
      new Color("#52333f"),
      new Dimension(16, 10),
      new Depth(),
    ]);
  }
}
