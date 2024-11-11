import { createEffect, onMount, type Component } from 'solid-js';
import { createWS } from '@solid-primitives/websocket';

import { Game } from './game/game';

type CanvasProps = {
  ws: WebSocket;
};

export const Canvas: Component<CanvasProps> = (props) => {
  const { ws } = props;

  let canvasRef: HTMLCanvasElement | undefined;
  let gameRef: Game | undefined;

  createEffect(() => {
    ws.addEventListener('open', () => {

    });

    ws.addEventListener('message', ({ data }) => {
      gameRef?.world.fromJSON(JSON.parse(data)[1]);
    });
  });

  onMount(() => {
    if (canvasRef) {
      const width = canvasRef.parentElement?.clientWidth ?? 0;
      const height = canvasRef.parentElement?.clientHeight ?? 0;

      canvasRef.width = width;
      canvasRef.height = height;

      gameRef = new Game(canvasRef);
      gameRef.render();
    }
  });

  return <canvas ref={canvasRef} width={480} height={480} />;
};
