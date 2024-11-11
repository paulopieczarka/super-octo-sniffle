import type { ServerWebSocket } from "bun";
import { WorldServer } from "./world";
import type { Player } from "./player";

export class Game {
  public players = new Array<ServerWebSocket<{ player: Player }>>();

  constructor(
    public world = new WorldServer(),
  ) {
    this.gameLoop();
  }

  public update() {
    this.world.executeSystems();

    for (const player of this.players) {
      player.send(JSON.stringify(['world', this.world]));
    }
  }

  public gameLoop() {
    setInterval(this.update.bind(this), 1_000 / 30);
  }
}
