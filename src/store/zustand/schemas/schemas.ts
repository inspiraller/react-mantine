import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PropSchemasObjects, PropSchemasObject } from '@/types/Schema';
import {
  updateSchemasObjects,
  removeSchemasObject,
  addSchemasObject,
} from './_util/_callbacks';
import { SchemasState } from './_util/types';

export const useSchemasStore = create<SchemasState>()(
  persist(
    (set) => ({
      schemasObjects: {},
      updateSchemasObjects: (schemasObjects: PropSchemasObjects) =>
        updateSchemasObjects(set, schemasObjects),
      removeSchemasObject: (name: string) => removeSchemasObject(set, name),
      addSchemasObject: (name: string, obj: PropSchemasObject) =>
        addSchemasObject(set, name, obj),
    }),
    { name: 'schemas-storage' },
  ),
);
