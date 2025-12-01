import { PropSchemasObject, PropSchemasObjects } from '@/types/Schema';

export const getAllSchemaNames = (schemaObjects: PropSchemasObjects) => {
  const all = Object.keys(schemaObjects).map((key: string) => {
    const obj = schemaObjects[key] as PropSchemasObject;
    return obj.schemaName;
  }, [] as string[]);
  return [...new Set(all)];
};
