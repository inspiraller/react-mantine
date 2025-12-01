import { addToObjects, removeFromObjects, updateObjects } from '@/store/_util';

// Type for Zustand's `set` function
type SetFn<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;

export const updateSchemasObjects = (set: SetFn<any>, schemasObjects: any) =>
  set((state: any) => ({
    ...state,
    schemasObjects: updateObjects(state.schemasObjects, schemasObjects),
  }));

export const removeSchemasObject = (set: SetFn<any>, name: string) =>
  set((state: any) => ({
    ...state,
    schemasObjects: removeFromObjects(state.schemasObjects, name),
  }));

export const addSchemasObject = (set: SetFn<any>, name: string, obj: any) =>
  set((state: any) => ({
    ...state,
    schemasObjects: addToObjects(state.schemasObjects, name, obj),
  }));
