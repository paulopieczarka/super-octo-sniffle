export class Entity {
  private static nextId = 0;

  public readonly id: number;

  constructor(public name: Readonly<string>) {
    this.id = Entity.nextId++;
  }
}
