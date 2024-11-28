import * as VectorMath from "../_utils/vector-math";
import { ComponentMask, Position, TargetPosition } from "../components";
import type { Entity } from "../entities";
import type { World } from "../world";
import { System } from "./system";

export class Movement extends System {
  public get requiredComponents() {
    return ComponentMask.Position | ComponentMask.TargetPosition;
  }

  public execute(entity: Entity, world: World) {
    const position = world.getComponent(entity.id, Position);
    const targetPosition = world.getComponent(entity.id, TargetPosition);

    if (!position || !targetPosition) return;

    if (VectorMath.distance(position, targetPosition) > 1) {
      position.x = VectorMath.lerp(position.x, targetPosition.x, 0.025);
      position.y = VectorMath.lerp(position.y, targetPosition.y, 0.025);
    } else {
      position.x = targetPosition.x;
      position.y = targetPosition.y;
    }
  }
}
