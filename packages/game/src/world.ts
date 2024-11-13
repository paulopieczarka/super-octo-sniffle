import {
  Color,
  type Component,
  Dimension,
  Position,
  TargetPosition,
  componentMap,
} from "./components/component";
import { Entity } from "./entities/entity";
import { Movement, type System } from "./systems/system";

export class World {
  private entities = new Map<number, Entity>();
  private components = new Map<number, Set<Component>>();
  private systems = new Set<System>();

  public executeSystems() {
    for (const system of this.systems) {
      for (const entity of this.getEntityArray()) {
        const entityComponentsMask =
          Array.from(this.components.get(entity.id)?.values() ?? []).reduce(
            (mask, comp) => mask | comp.getMask(),
            0,
          ) ?? 0;
        const shouldExecuteForEntity =
          (system.requiredComponents & entityComponentsMask) ===
          system.requiredComponents;

        if (shouldExecuteForEntity) {
          system.execute(entity, this);
        }
      }
    }
  }

  public getEntityArray() {
    return Array.from(this.entities.values());
  }

  public createEntity(name: string, params: { components: Component[] }) {
    const entity = new Entity(name);

    for (const component of params.components) {
      this.addComponent(entity.id, component);
    }

    this.entities.set(entity.id, entity);
    return entity;
  }

  public getEntity(id: number) {
    return this.entities.get(id);
  }

  public addComponent(entityId: number, component: Component) {
    const components = this.components.get(entityId);

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
    const entityComponents = new Set([
      ...entity.initialize(params),
      ...components,
    ]);

    this.entities.set(entity.id, entity);
    this.components.set(entity.id, entityComponents);

    return entity;
  }

  // biome-ignore lint/suspicious/noExplicitAny: must be a any
  public getComponent<T extends Component>(
    entityId: number,
    componentClass: new (...args: any[]) => T,
  ) {
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
      components: Array.from(this.components.entries()).map(
        ([key, componentSet]) => [key, Array.from(componentSet)],
      ),
    };
  }

  // @todo use zod
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
