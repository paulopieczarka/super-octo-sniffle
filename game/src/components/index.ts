import { Color } from './color';
import { Depth } from './depth';
import { Dimension } from './dimension';
import { FollowEntity } from './follow-entity';
import { Inventory } from './Inventory';
import { Position } from './position';
import { Resource } from './resource';
import { Shape } from './shape';
import { TargetPosition } from './target-position';
import { TaskGatherItem } from './task-gather-item';
import { Zombie } from './zombie';

export type { Component } from './component';
export { Color } from './color';
export { Depth } from './depth';
export { Dimension } from './dimension';
export { FollowEntity } from './follow-entity';
export { Inventory } from './Inventory';
export { Position } from './position';
export { Resource } from './resource';
export { Shape } from './shape';
export { TargetPosition } from './target-position';
export { TaskGatherItem } from './task-gather-item';
export { Zombie } from './zombie';

export const componentMap = {
  Color,
  Depth,
  Dimension,
  FollowEntity,
  Inventory,
  Position,
  Resource,
  Shape,
  TargetPosition,
  TaskGatherItem,
  Zombie,
} as const;

function getBitmaskOffsets<T extends string>(keys: T[]): Record<T, number> {
  return keys.reduce((acc, key, index) => {
    acc[key] = 1 << index;
    return acc;
  }, {} as Record<T, number>);
}

export const ComponentMask = getBitmaskOffsets<keyof typeof componentMap>(
  Object.keys(componentMap) as Array<keyof typeof componentMap>
);
