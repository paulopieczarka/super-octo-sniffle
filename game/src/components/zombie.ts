import chroma from "chroma-js";

import { Component } from "./component";

export class Zombie extends Component {
  constructor() {
    super("Zombie");
  }

  public zombifyColor(color: string) {
    return chroma(color)
      .set('hsl.h', 120) // Shift hue towards green
      .set('hsl.s', '*0.5') // Reduce saturation by half
      .set('hsl.l', '+0.1') // Lighten slightly
      .hex(); // Return the resulting color in HEX
  }

  public toJSON() {
    return { ...super.toJSON() };
  }

  public static fromJSON() {
    return new Zombie();
  }
}
