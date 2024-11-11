import type { Component } from "solid-js";
import { createWS, createWSState } from "@solid-primitives/websocket";

import { Canvas } from "./canvas";

export const App: Component = () => {
  const ws = createWS("ws://localhost:9000/ws");

  const state = createWSState(ws);
  const states = ["connecting", "connected", "disconnecting", "disconnected"];

  return (
    <>
      <header class="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
        <div>
          <h4 class="text-white text-sm font-mono">hagokia.net</h4>
        </div>
        <div>
          <button type="button" class="text-white text-sm bg-violet-600 px-2 py-1 rounded-md">Login</button>
        </div>
      </header>
      <main class="flex-1 flex flex-col">
        <div class="flex-1">
          <Canvas ws={ws} />
        </div>
        <section class="h-32 bg-slate-800 border-t border-slate-500">
          <header class="text-xs px-4 py-2 bg-slate-700 border-b border-slate-600">
            <h4>Event log</h4>
          </header>
        </section>
      </main>
      <footer class="bg-slate-900 border-t border-slate-800 px-4 py-2">
        <ul class="flex flex-row items-center gap-4 text-xs text-slate-400 font-mono">
          <li>Socket status: <span>{states[state()]}</span></li>
          <li>Players online: 0</li>
        </ul>
      </footer>
    </>
  );
};
