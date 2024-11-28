import type { Item } from "../items";
import { Component } from "./component";

export class Resource extends Component {
  constructor(
    public readonly item: Item,
    public amount = 1,
  ) {
    super("Resource");
  }

  public toJSON() {
    return { ...super.toJSON(), item: this.item, amount: this.amount };
  }

  public static fromJSON({
    item,
    amount,
  }: Omit<ReturnType<typeof Resource.prototype.toJSON>, "name">) {
    return new Resource(item, amount);
  }
}
