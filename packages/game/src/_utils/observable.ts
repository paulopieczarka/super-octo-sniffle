export interface Observable {
  isDirty: boolean;
}

export function observable<T extends Observable>(target: T) {
  return new Proxy<T>(target, {
    set(target, property: string & keyof T, value) {
      target[property] = value;

      if (property !== "isDirty") {
        target.isDirty = true;
      }

      return true;
    },
  });
}
