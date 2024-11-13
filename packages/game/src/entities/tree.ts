import {
  Color,
  Depth,
  Dimension,
  Position,
  Resource,
  Shape,
} from "../components";
import { Item } from "../items";
import { Entity } from "./entity";

export class Tree extends Entity {
  constructor() {
    super("Tree");
  }

  public initialize(params: { x: number; y: number }) {
    return new Set([
      new Position(params.x, params.y),
      new Color("#3b7d4f"),
      new Dimension(10, 14),
      new Depth(),
      new Resource(Item.Wood, 10),
      new Shape([
        {
          type: "polygon",
          coordinates: [
            { x: 3 + 0, y: 10 + 0 },
            { x: 3 + 4, y: 10 + 0 },
            { x: 3 + 4, y: 10 + 4 },
            { x: 3 + 0, y: 10 + 4 },
          ],
          fillStyle: "#3d2936",
        },
        {
          type: "polygon",
          coordinates: [
            { x: 0, y: 0 },
            { x: 10, y: 0 },
            { x: 10, y: 10 },
            { x: 0, y: 10 },
          ],
          fillStyle: "componentColor",
        },
      ]),
    ]);
  }
}
