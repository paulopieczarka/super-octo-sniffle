import { Color, Depth, Dimension, Position } from "../components";
import { Entity } from "./entity";

export class Rock extends Entity {
  constructor() {
    super("Rock");
  }

  public initialize(params: { x: number; y: number }) {
    return new Set([
      new Position(params.x, params.y),
      new Color("#454a6a"),
      new Dimension(5, 5),
      new Depth(),
    ]);
  }
}
