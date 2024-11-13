import {
  ComponentMask,
  Depth,
  Dimension,
  FollowEntity,
  Position,
  TargetPosition,
} from "../components/component";
import type { Entity } from "../entities/entity";
import type { World } from "../world";

export abstract class System {
  public abstract get requiredComponents(): number;

  public abstract execute(entity: Entity, world: World): void;
}

function lerp(start: number, end: number, t: number) {
  const fixedT = Math.max(0, Math.min(1, t));
  return start + (end - start) * fixedT;
}

function distance(source: Position, target: TargetPosition) {
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export class Movement extends System {
  public get requiredComponents() {
    return ComponentMask.Position | ComponentMask.TargetPosition;
  }

  public execute(entity: Entity, world: World) {
    const position = world.getComponent(entity.id, Position);
    const targetPosition = world.getComponent(entity.id, TargetPosition);

    if (!position || !targetPosition) return;

    if (distance(position, targetPosition) > 1) {
      position.x = lerp(position.x, targetPosition.x, 0.025);
      position.y = lerp(position.y, targetPosition.y, 0.025);
    } else {
      position.x = targetPosition.x;
      position.y = targetPosition.y;
    }
  }
}

export class WanderAround extends System {
  public get requiredComponents() {
    return ComponentMask.Position | ComponentMask.TargetPosition;
  }

  public execute(entity: Entity, world: World) {
    const position = world.getComponent(entity.id, Position);
    const targetPosition = world.getComponent(entity.id, TargetPosition);

    if (!position || !targetPosition) return;

    const followEntity = world.getComponent(entity.id, FollowEntity);

    if (followEntity && distance(position, targetPosition) < 1) {
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

    if (distance(position, targetPosition) < 1) {
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
