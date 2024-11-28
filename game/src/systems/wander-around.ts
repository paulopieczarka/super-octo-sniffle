import * as VectorMath from "../_utils/vector-math";
import {
  ComponentMask,
  FollowEntity,
  Position,
  TargetPosition,
} from "../components";
import type { Entity } from "../entities";
import type { World } from "../world";
import { System } from "./system";

export class WanderAround extends System {
  public get requiredComponents() {
    return ComponentMask.Position | ComponentMask.TargetPosition;
  }

  public execute(entity: Entity, world: World) {
    const position = world.getComponent(entity.id, Position);
    const targetPosition = world.getComponent(entity.id, TargetPosition);

    if (!position || !targetPosition) return;

    const followEntity = world.getComponent(entity.id, FollowEntity);

    if (followEntity && VectorMath.distance(position, targetPosition) < 1) {
      const entity = world.getEntity(followEntity.entityId);
      const entityPosition = entity
        ? world.getComponent(entity.id, Position)
        : undefined;

      if (entityPosition) {
        targetPosition.x =
          entityPosition.x +
          (Math.random() * followEntity.radius -
            Math.random() * followEntity.radius);
        targetPosition.y =
          entityPosition.y +
          (Math.random() * followEntity.radius -
            Math.random() * followEntity.radius);
        return;
      }
    }

    if (VectorMath.distance(position, targetPosition) < 1) {
      targetPosition.x = Math.max(
        0,
        Math.min(1024, position.x + (Math.random() * 32 - Math.random() * 32)),
      );
      targetPosition.y = Math.max(
        0,
        Math.min(1024, position.y + (Math.random() * 32 - Math.random() * 32)),
      );
    }
  }
}
