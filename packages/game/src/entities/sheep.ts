import { Color, Depth, Dimension, Position } from "../components";
import { Entity } from "./entity";

export class Sheep extends Entity {
  constructor() {
    super('Sheep');
  }
  
  public initialize(params: { x: number, y: number }) {
    return new Set([
      new Position(params.x, params.y),
      new Color('#ffffff'),
      new Dimension(6, 6),
      new Depth(),
    ]);
  }
}
