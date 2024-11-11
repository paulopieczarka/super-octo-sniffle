import { createEffect, onMount, type Component } from 'solid-js';
import { createWS } from '@solid-primitives/websocket';

import { Game } from './game';

export const App: Component = () => {
  let canvasRef: HTMLCanvasElement | undefined;
  let gameRef: Game | undefined;

  const ws = createWS("ws://localhost:9000/ws");

  createEffect(() => {
    ws.addEventListener('open', () => {

    });

    ws.addEventListener('message', ({ data }) => {
      gameRef?.world.fromJSON(JSON.parse(data)[1]);
    });
  });

  onMount(() => {
    if (canvasRef) {
      gameRef = new Game(canvasRef);
      gameRef.render();
    }
  });

  return <canvas ref={canvasRef} width={480} height={480} />;
};
