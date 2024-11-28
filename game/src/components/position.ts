import { Component } from "./component";

export class Position extends Component {
  constructor(
    public x: number,
    public y: number,
  ) {
    super("Position");
  }

  public toJSON() {
    return { ...super.toJSON(), x: this.x, y: this.y };
  }

  public static fromJSON({ x, y }: { x: number; y: number }) {
    return new Position(x, y);
  }
}
