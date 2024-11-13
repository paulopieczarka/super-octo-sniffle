import type { Player } from "./player";
import type { World } from "./world";

export type ClientAction = {
  useCard: string;
};

export type ServerAction = {
  updateWorld: World;
  updatePlayer: Player;
  addLogMessage: string;
};

export type Action = ClientAction & ServerAction;

export function createAction(
  method: keyof Action,
  payload?: Action[typeof method],
) {
  return { method, payload };
}
