import { Color, ComponentMask, Dimension, Position, TargetPosition } from "../components/component";
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
    const position = world.getComponent(entity.id, Position)!;
    const targetPosition = world.getComponent(entity.id, TargetPosition)!;

    if (distance(position, targetPosition) > 1) {
      position.x = lerp(position.x, targetPosition.x, 0.1);
      position.y = lerp(position.y, targetPosition.y, 0.1);
    } else {
      position.x = targetPosition.x;
      position.y = targetPosition.y;
      targetPosition.x = Math.max(0, Math.min(480, position.x + (Math.random() * 128 - Math.random() * 128)));
      targetPosition.y = Math.max(0, Math.min(480, position.y + (Math.random() * 128 - Math.random() * 128)));
    }
  }
}
