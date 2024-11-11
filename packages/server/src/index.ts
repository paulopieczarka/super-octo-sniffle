import Bun from 'bun';
import { Game, type Player } from '@hagokia/game';

const game = new Game();

const server = Bun.serve<{ player: Player }>({
  hostname: '0.0.0.0',
  port: 9000,
  async fetch(req) {
    const { pathname } = new URL(req.url);
    console.log(`Fetching (${req.method}) ${pathname}`);

    if (pathname === '/ws' && server.upgrade(req)) {
      return;
    }

    return new Response('Not found', { status: 404 })
  },
  websocket: {
    open(ws) {
      console.log(`Client ${ws.remoteAddress} connected`);
      // ws.send(JSON.stringify(['world', game.world]));
      game.players.push(ws);
    },
    message() {},
  },
});

console.log(`Server started at http://${server.hostname}:${server.port} ✨`);
