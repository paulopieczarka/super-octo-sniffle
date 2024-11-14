import { type Action, type Player, createAction } from "@hagokia/game";
import {
  createReconnectingWS,
  createWS,
  createWSState,
} from "@solid-primitives/websocket";
import {
  type Component,
  For,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";

import { Canvas } from "./canvas";

export const App: Component = () => {
  const [player, setPlayer] = createSignal<Player>();
  const [messages, setMessages] = createSignal<string[]>([]);

  const cards = createMemo(() => player()?.cards ?? []);

  const ws = createReconnectingWS("ws://localhost:9000/ws");

  createEffect(() => {
    ws.addEventListener("open", () => {});

    ws.addEventListener("message", ({ data }) => {
      const { method, payload } = JSON.parse(data) as ReturnType<
        typeof createAction
      >;
      if (method === "updatePlayer") {
        setPlayer(payload as Action["updatePlayer"]);
        return;
      }

      if (method === "addLogMessage") {
        console.log(payload);
        setMessages((prev) => [...prev, payload as string]);
      }
    });
  });

  const state = createWSState(ws);
  const states = ["connecting", "connected", "disconnecting", "disconnected"];

  const handleUseCard = (cardId: string) => {
    console.log("useCard", { id: cardId });
    ws.send(JSON.stringify(createAction("useCard", cardId)));
  };

  return (
    <>
      <header class="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
        <div>
          <h4 class="text-white text-sm font-mono">hagokia.net</h4>
        </div>
        <div>
          <button
            type="button"
            class="text-white text-sm bg-violet-600 px-2 py-1 rounded-md"
          >
            Login
          </button>
        </div>
      </header>
      <main class="flex-1 flex flex-col">
        <div class="flex-1">
          <Canvas ws={ws} />
        </div>
        <div class="flex flex-row gap-0.5">
          <section class="flex-1 h-32 bg-slate-800 border-t border-slate-500">
            <header class="text-xs px-4 py-2 bg-slate-700 border-b border-slate-600">
              <h4>Event log</h4>
            </header>
            <ul class="p-2">
              <For each={messages()}>
                {(message) => {
                  return <li class="text-xs">{message}</li>;
                }}
              </For>
            </ul>
          </section>
          <section class="flex-1 flex flex-col h-32 bg-slate-800 border-t border-slate-500">
            <header class="text-xs px-4 py-2 bg-slate-700 border-b border-slate-600">
              <h4>My stack</h4>
            </header>
            <div class="flex-1 flex flex-row justify-start gap-2 p-2">
              <For each={cards()}>
                {(item) => {
                  console.log("Rendering button for:", item.name); // Debug log
                  return (
                    <button
                      type="button"
                      class="w-[100px] flex items-center justify-center text-center p-4 bg-slate-500 rounded-md border border-slate-400 cursor-pointer hover:bg-slate-600 hover:border-slate-500"
                      onClick={() => handleUseCard(item.id)}
                    >
                      {item.name}
                    </button>
                  );
                }}
              </For>
            </div>
          </section>
        </div>
      </main>
      <footer class="bg-slate-900 border-t border-slate-800 px-4 py-2">
        <ul class="flex flex-row items-center gap-4 text-xs text-slate-400 font-mono">
          <li>
            Socket status: <span>{states[state()]}</span>
          </li>
          <li>Players online: 0</li>
        </ul>
      </footer>
    </>
  );
};
