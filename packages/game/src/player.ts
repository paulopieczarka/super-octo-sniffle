import type { Camera } from "./camera";

export class Player {
  constructor(
    public username: string,
    public color: string,
    public camera: Camera,
  ) {}
}
