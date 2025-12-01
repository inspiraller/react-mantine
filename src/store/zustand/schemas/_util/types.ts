import { PropSchemasObject, PropSchemasObjects } from '@/types/Schema';

export interface SchemasState {
  schemasObjects: PropSchemasObjects;
  updateSchemasObjects: (schemas: PropSchemasObjects) => void;
  removeSchemasObject: (schemaName: string) => void;
  addSchemasObject: (schemaName: string, obj: PropSchemasObject) => void;
}
