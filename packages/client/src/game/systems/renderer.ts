import type { World } from "@hagokia/game";
import { Color, ComponentMask, Dimension, Position } from "@hagokia/game/compoennts";
import type { Entity } from "@hagokia/game/entities";
import { System } from "@hagokia/game/systems";

export class Renderer extends System {
  constructor(private ctx: CanvasRenderingContext2D) {
    super();
  }

  public get requiredComponents() {
    return ComponentMask.Position | ComponentMask.Dimension | ComponentMask.Color;
  }

  public execute(entity: Entity, world: World) {
    const position = world.getComponent<Position>(entity.id, Position);
    const dimension = world.getComponent<Dimension>(entity.id, Dimension);
    const color = world.getComponent<Color>(entity.id, Color);

    if (!position || !dimension || !color) return;

    this.ctx.fillStyle = color.value;
    this.ctx.fillRect(position.x, position.y, dimension.width, dimension.height);
  }
}
