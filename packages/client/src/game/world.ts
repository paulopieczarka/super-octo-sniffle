import { World } from "@hagokia/game";
import { Depth } from "@hagokia/game/compoennts";

export class WorldClient extends World {
  public override getEntityArray() {
    const entities = [...super.getEntityArray()];

    return entities.sort((entity, nextEntity) => {
      const entityDepth = this.getComponent(entity.id, Depth);
      const nextEntityDepth = this.getComponent(nextEntity.id, Depth);

      if (entityDepth && nextEntityDepth) {
        return entityDepth.bottom - nextEntityDepth.bottom;
      }

      if (entityDepth) return 1;
      if (nextEntityDepth) return -1;
      return 0;
    });
  }
}
