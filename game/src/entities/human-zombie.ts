import { type Component, Zombie } from "../components";
import { Human } from "./human";

export class HumanZombie extends Human {
  constructor() {
    super("Human Zombie");
  }

  public initialize(params: { x: number; y: number; color: string }) {
    return new Set<Component>([...super.initialize(params), new Zombie()]);
  }
}
