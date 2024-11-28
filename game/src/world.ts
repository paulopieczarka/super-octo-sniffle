import { type Component, componentMap } from "./components";
import type { Entity } from "./entities/entity";
import type { System } from "./systems/system";

export class World {
  private entities = new Map<number, Entity>();
  private components = new Map<number, Set<Component>>();
  private systems = new Set<System>();

  public executeSystems() {
    for (const entity of this.getEntities()) {
      for (const system of this.systems) {
        if (system.shouldRun(entity.mask)) {
          system.execute(entity, this);
        }
      }
    }
  }

  public getEntities() {
    return Array.from(this.entities.values());
  }

  public getEntity(id: number) {
    return this.entities.get(id);
  }

  public getComponents() {
    return Array.from(this.components.values());
  }

  public addComponent(entityId: number, component: Component) {
    const components = this.components.get(entityId);
    const entity = this.entities.get(entityId);

    if (!entity) throw new Error(`[Error] undefined entity for id ${entityId}`);

    entity.mask |= component.getMask();

    if (!components) {
      this.components.set(entityId, new Set([component]));
      return;
    }

    components.add(component);
  }

  public spawn<T extends Entity>(
    EntityClass: new () => T,
    params?: Parameters<T["initialize"]>[0],
    components: Component[] = [],
  ): T {
    const entity = new EntityClass();
    this.entities.set(entity.id, entity);

    this.components.set(
      entity.id,
      new Set([...entity.initialize(params), ...components]),
    );

    // @todo better manage entities bitmasks
    entity.mask =
      this.components
        .get(entity.id)
        ?.values()
        .reduce((mask, component) => mask | component.getMask(), 0) ?? 0;

    return entity;
  }

  public getComponent<T extends Component>(
    entityId: number,
    // biome-ignore lint/suspicious/noExplicitAny:
    componentClass: new (...args: any[]) => T,
  ) {
    const entityComponents = this.components.get(entityId);
    if (entityComponents) {
      return Array.from(entityComponents).find(
        (c) => c instanceof componentClass,
      ) as T;
    }

    return null;
  }

  public addSystem(system: System) {
    this.systems.add(system);
  }

  // @todo move to serializer
  public toJSON() {
    return {
      entities: Array.from(this.entities.values()),
      components: Array.from(this.components.entries()).map(
        ([key, componentSet]) => [key, Array.from(componentSet)],
      ),
    };
  }

  // @todo use zod
  // @todo move to serializer
  public fromJSON(data: {
    entities: Entity[];
    components: Array<[number, ({ name: string } & Component)[]]>;
  }) {
    this.entities = new Map<number, Entity>();
    this.components = new Map<number, Set<Component>>();

    for (const entity of data.entities) {
      this.entities.set(entity.id, entity);
    }

    for (const [entityId, components] of data.components) {
      for (const { name, ...component } of components) {
        const ComponentClass = componentMap[name as keyof typeof componentMap];

        if (ComponentClass) {
          // biome-ignore lint/suspicious/noExplicitAny: sorry
          const componentInstance = ComponentClass.fromJSON(component as any);
          this.addComponent(entityId, componentInstance);
        }
      }
    }
  }
}
