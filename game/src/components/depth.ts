import { Component } from "./component";

export class Depth extends Component {
  constructor(
    public top = 0,
    public bottom = 0,
  ) {
    super("Depth");
  }

  public toJSON() {
    return { ...super.toJSON(), top: this.top, bottom: this.bottom };
  }

  public static fromJSON({ top, bottom }: { top: number; bottom: number }) {
    return new Depth(top, bottom);
  }
}
