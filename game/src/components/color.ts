import { Component } from "./component";

export class Color extends Component {
  constructor(public value: string) {
    super("Color");
  }

  public toJSON() {
    return { ...super.toJSON(), value: this.value };
  }

  public static fromJSON({ value }: { value: string }) {
    return new Color(value);
  }
}
