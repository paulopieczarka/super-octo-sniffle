import type { Observable } from "./_utils/observable";
import type { Camera } from "./camera";
import type { Card } from "./cards";

export class Player implements Observable {
  public cards = new Array<Card>();

  public isDirty = true;

  constructor(
    public username: string,
    public color: string,
    public camera: Camera,
  ) {}
}
