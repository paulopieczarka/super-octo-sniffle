import type { createAction } from "@hagokia/game";
import { type Component, createEffect, onMount } from "solid-js";

import { Game } from "./game/game";

type CanvasProps = {
  ws: WebSocket;
};

export const Canvas: Component<CanvasProps> = (props) => {
  const { ws } = props;

  let canvasRef: HTMLCanvasElement | undefined;
  let gameRef: Game | undefined;

  createEffect(() => {
    ws.addEventListener("open", () => {});

    ws.addEventListener("message", ({ data }) => {
      const { method, payload } = JSON.parse(data) as ReturnType<
        typeof createAction
      >;
      if (method === "updateWorld") {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        gameRef?.world.fromJSON(payload as any);
      }
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
