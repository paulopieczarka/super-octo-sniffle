import type { Position, TargetPosition } from "../components";

export function lerp(start: number, end: number, t: number) {
  const fixedT = Math.max(0, Math.min(1, t));
  return start + (end - start) * fixedT;
}

export function distance(source: Position, target: TargetPosition) {
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  return Math.sqrt(dx * dx + dy * dy);
}
