import { PropSchemasObjects, PropsSchemaResponse } from '@/types/Schema';
import { useSchemasStore } from './schemas';

export const URL_API_PATH = '/schemas';
export const nameKey = 'schemaName';

export const useUpdateSchemasStore = () => {
  const { updateSchemasObjects } = useSchemasStore();
  const callback = (response: PropsSchemaResponse): PropsSchemaResponse => {
    const objects = response.results.reduce((acc, cur) => {
      const { _id, ...remainder } = cur;
      acc[_id as string] = remainder;
      return acc;
    }, {} as PropSchemasObjects);
    updateSchemasObjects(objects);
    return response;
  };
  return { callback };
};
