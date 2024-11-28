import { Component } from "./component";

export class Dimension extends Component {
  constructor(
    public width: number,
    public height: number,
  ) {
    super("Dimension");
  }

  public toJSON() {
    return { ...super.toJSON(), width: this.width, height: this.height };
  }

  public static fromJSON({ width, height }: { width: number; height: number }) {
    return new Dimension(width, height);
  }
}
