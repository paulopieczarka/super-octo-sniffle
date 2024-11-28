import { Component } from "./component";
import { Resource } from "./resource";

export class Inventory extends Component {
  constructor(public slots = 1) {
    super("Resource");
  }

  public toJSON() {
    return { ...super.toJSON(), slots: this.slots };
  }

  public static fromJSON({
    item,
    amount,
  }: Omit<ReturnType<typeof Resource.prototype.toJSON>, "name">) {
    return new Resource(item, amount);
  }
}
