import { PropSchemasObject, PropSchemasObjects } from '@/types/Schema';

export const getSchemaChildNames = (schemaObjects: PropSchemasObjects) => {
  const found = Object.keys(schemaObjects).reduce((acc, cur: string) => {
    const obj = schemaObjects[cur] as PropSchemasObject;
    if (obj.isAllowAsSchemaChild) {
      acc.push(obj.schemaName);
    }
    return acc;
  }, [] as string[]);
  return [...new Set(found)];
};
