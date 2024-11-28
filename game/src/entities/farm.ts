import { Color, Depth, Dimension, Position, Shape } from "../components";
import { Entity } from "./entity";

export class Farm extends Entity {
  constructor() {
    super("Farm");
  }

  public initialize(params: { x: number; y: number; color: string }) {
    return new Set([
      new Position(params.x, params.y),
      new Color(params.color),
      new Dimension(10, 4),
      new Depth(),
      new Shape([
        {
          type: "polygon",
          coordinates: [
            { x: 0, y: 0 },
            { x: 24, y: 0 },
            { x: 24, y: 24 },
            { x: 0, y: 24 },
          ],
          fillStyle: "#3d2936",
          lineWidth: 1,
          strokeStyle: 'componentColor'
        },
      ]),
    ]);
  }
}
