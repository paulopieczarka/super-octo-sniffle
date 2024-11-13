import { type Player, createAction } from "@hagokia/game";
import type { ServerWebSocket } from "bun";

import { WorldServer } from "./world";

export class Game {
  public sockets = new Array<ServerWebSocket<{ player: Player }>>();

  constructor(public world = new WorldServer()) {
    this.gameLoop();
  }

  public update() {
    this.world.executeSystems();

    this.sockets[0]?.publish(
      "broadcast",
      JSON.stringify(createAction("updateWorld", this.world)),
    );

    for (const socket of this.sockets) {
      if (socket.data.player.isDirty) {
        socket.data.player.isDirty = false;
        socket.send(
          JSON.stringify(createAction("updatePlayer", socket.data.player)),
        );
      }

      // socket.send(JSON.stringify(createAction('updateWorld', this.world)))
    }
  }

  public gameLoop() {
    setInterval(this.update.bind(this), 1_000 / 30);
  }
}
