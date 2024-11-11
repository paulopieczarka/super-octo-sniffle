import { Entity } from "./entities/entity";
import { Movement, System } from "./systems/system";
import { Color, Component, componentMap, Dimension, Position, TargetPosition } from "./components/component";

export class World {
  private entities = new Map<number, Entity>();
  private components = new Map<number, Set<Component>>();
  private systems = new Set<System>();

  public executeSystems() {
    this.systems.forEach((system) => {
      this.entities.values().forEach((entity) => {
        const entityComponentsMask = this.components.get(entity.id)?.values().reduce((mask, comp) => mask | comp.getMask(), 0) ?? 0;
        const shouldExecuteForEntity = (system.requiredComponents & entityComponentsMask) === system.requiredComponents;

        if (shouldExecuteForEntity) {
          system.execute(entity, this);
        }
      });
    });
  }

  public createEntity(name: string, params: { components: Component[] }) {
    const entity = new Entity(name);

    params.components.forEach((component) => {
      this.addComponent(entity.id, component);
    });

    this.entities.set(entity.id, entity);
    return entity;
  }

  public addComponent(entityId: number, component: Component) {
    const components = this.components.get(entityId);
    if (!components) {
      this.components.set(entityId, new Set([component]));
      return;
    }

    components.add(component);
  }

  public getComponent<T extends Component>(entityId: number, componentClass: new (...args: any[]) => T) {
    const entityComponents = this.components.get(entityId);
    if (!entityComponents) return null;

    for (const component of entityComponents) {
      if (component instanceof componentClass) {
        return component as T;
      }
    }

    return null;
  }

  public addSystem(system: System) {
    this.systems.add(system);
  }

  public toJSON() {
    return {
      entities: Array.from(this.entities.values()),
      components: Array.from(this.components.entries()).map(([key, componentSet]) => [
        key, Array.from(componentSet)
      ])
    };
  }

  // @todo use zod
  public fromJSON(data: { entities: Entity[], components: Array<[number, ({ name: string } & Component)[]]> }) {
    this.entities = new Map<number, Entity>();
    this.components = new Map<number, Set<Component>>();

    data.entities.forEach((entity) => {
      this.entities.set(entity.id, entity);
    });

    data.components.forEach(([entityId, components]) => {
      components.forEach(({ name, ...component }) => {
        const ComponentClass = componentMap[name as keyof typeof componentMap];

        if (ComponentClass) {
          const componentInstance = ComponentClass.fromJSON(component as any);
          this.addComponent(entityId, componentInstance);
        }
      });
    });
  }
}

export class WorldServer extends World {
  constructor() {
    super();

    this.addSystem(new Movement());

    this.createEntity('Campfire', {
      components: [
        new Position(235, 238),
        new Dimension(10, 4),
        new Color('red'),
      ],
    });
    
    for (let i=0; i < 10; i++) {
      const rx = Math.random() * 480;
      const ry = Math.random() * 480;

      this.createEntity('Rock', {
        components: [new Position(rx, ry), new Dimension(5, 5), new Color('white')],
      });
    }

    for (let i=0; i < 10; i++) {
      const rx = Math.random() * 480;
      const ry = Math.random() * 480;

      this.createEntity('Human', {
        components: [new Position(rx, ry), new Dimension(10, 10), new Color('red'), new TargetPosition(64, 64)],
      });
    }
  }
}



