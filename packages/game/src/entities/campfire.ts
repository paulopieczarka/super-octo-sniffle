import { Color, Depth, Dimension, Position, Shape } from "../components";
import { Entity } from "./entity";

export class Campfire extends Entity {
  constructor() {
    super('Campfire');
  }
  
  public initialize(params: { x: number, y: number, color: string }) {
    return new Set([
      new Position(params.x, params.y),
      new Color(params.color),
      new Dimension(10, 4),
      new Depth(),
      new Shape([
        {
          type: 'polygon',
          coordinates: [
            { x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 4 }, { x: 0, y: 4 },
          ],
          fillStyle: '#52333f',
          lineWidth: 1
        },
        {
          type: 'polygon',
          coordinates: [
            { x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 3 }, { x: 0, y: 3 },
          ],
          fillStyle: 'componentColor',
        }
      ])
    ]);
  }
}
