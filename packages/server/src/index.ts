import Bun from 'bun';
import { Camera, Card, createAction, observable, Player, type Action } from '@hagokia/game';

import { Game } from './game/game';

const game = new Game();

const server = Bun.serve<{ player: Player }>({
  hostname: '0.0.0.0',
  port: 9000,
  async fetch(req) {
    const { pathname } = new URL(req.url);
    console.log(`Fetching (${req.method}) ${pathname}`);

    if (pathname === '/ws') {
      const player = observable(new Player('Testador200', 'red', new Camera(0, 0, 500, 500)))
      player.cards.push(Card.GatherWood);
      player.cards.push(Card.GatherWood);
      server.upgrade(req, { data: { player } });
      return;
    }

    return new Response('Not found', { status: 404 })
  },
  websocket: {
    open(ws) {
      console.log(`Client ${ws.remoteAddress} connected`);
      ws.subscribe('broadcast');

      game.sockets.push(ws);

      for (const socket of game.sockets) {
        socket.send(JSON.stringify(createAction('addLogMessage', `[Server] ${ws.data.player.username} joined @ ${ws.remoteAddress}`)));
      }
    },
    message(ws, message: string) {
      const action = JSON.parse(message) as ReturnType<typeof createAction>;

      if (action.method === 'useCard') {
        const indexToRemove = ws.data.player.cards.findIndex((card) => card.id === action.payload);
        if (indexToRemove !== -1) {
          const card = ws.data.player.cards[indexToRemove];

          ws.send(JSON.stringify(createAction('addLogMessage', `[Action] ${card.name} activated`)));
          ws.data.player.cards = ws.data.player.cards.filter((_, index) => index !== indexToRemove);
        }
        return;
      }

      console.warn(action);
    },
  },
});

console.log(`Server started at http://${server.hostname}:${server.port} ✨`);
