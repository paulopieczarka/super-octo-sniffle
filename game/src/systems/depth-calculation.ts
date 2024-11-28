import { ComponentMask, Depth, Dimension, Position } from "../components";
import type { Entity } from "../entities";
import type { World } from "../world";
import { System } from "./system";

export class DepthCalculation extends System {
  public get requiredComponents() {
    return (
      ComponentMask.Position | ComponentMask.Dimension | ComponentMask.Depth
    );
  }

  public execute(entity: Entity, world: World) {
    const position = world.getComponent(entity.id, Position);
    const dimension = world.getComponent(entity.id, Dimension);
    const depth = world.getComponent(entity.id, Depth);

    if (!position || !dimension || !depth) return;

    depth.top = position.y;
    depth.bottom = position.y + dimension.height;
  }
}
