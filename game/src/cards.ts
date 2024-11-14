export class Card {
  static GatherWood = new Card("GatherWood", "Gather Wood");
  static BuildFarm = new Card("BuildFarm", "Build Farm");

  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}
}
