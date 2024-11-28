import { Component } from "./component";

type Polygon = {
  type: "polygon";
  coordinates: Array<{ x: number; y: number }>;
  fillStyle: "componentColor" | string;
  strokeStyle?: "componentColor" | string;
  lineWidth?: number;
};

export class Shape extends Component {
  constructor(public data: Polygon[]) {
    super("Shape");
  }

  public toJSON() {
    return { ...super.toJSON(), data: this.data };
  }

  public static fromJSON({
    data,
  }: Omit<ReturnType<typeof Shape.prototype.toJSON>, "name">) {
    return new Shape(data);
  }
}
