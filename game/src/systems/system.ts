import type { Entity } from "../entities/entity";
import type { World } from "../world";

export abstract class System {
  public abstract get requiredComponents(): number;

  public abstract execute(entity: Entity, world: World): void;

  public shouldRun(entityMask: number) {
    return (this.requiredComponents & entityMask) === this.requiredComponents;
  }
}
