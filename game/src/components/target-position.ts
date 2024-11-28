import { Component } from "./component";

export class TargetPosition extends Component {
  constructor(
    public x: number,
    public y: number,
  ) {
    super("TargetPosition");
  }

  public toJSON() {
    return { ...super.toJSON(), x: this.x, y: this.y };
  }

  public static fromJSON({ x, y }: { x: number; y: number }) {
    return new TargetPosition(x, y);
  }
}
