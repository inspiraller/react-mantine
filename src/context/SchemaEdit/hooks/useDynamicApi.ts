import { EditSchemaTypes } from '@/editSchema/editSchemaTypes';
import { DynamicApiTypes } from '@/types/functions';

// This detects in the section data if property: is_dynamic_api= true
// If so we don't return the section data
// We get the data from a custom method.
// The custom method (determined by section.type )
// Will get the data to replacey DataValue into SchemaUpdate...

interface Props {
  is_dynamic_api?: boolean;
  type?: EditSchemaTypes['SectionType'];
}
export const useDynamicApi = ({ type, is_dynamic_api }: Props) => {
  // will be dynamically populated from api request...
  const dynamicApiTypes: DynamicApiTypes = {};

  // const {
  //   dataExample,
  //   isLoadingGet: loadingExample,
  //   errorGet: errorGetExample,
  // } = useExample({ is_dynamic_api, type });

  // if (dataExample && !loadingExample) {
  //   dynamicApiTypes.example = example;
  // }

  // const isLoadingGet = loadingExample; // || other isLoadingGet...
  // const errorGet = errorGetExample; // || other isErrorGet

  let isLoadingGet = false;
  let errorGet = undefined;

  const dynamicApi = type
    ? dynamicApiTypes[type]
    : { items: undefined, functions: undefined };

  return { isLoadingGet, errorGet, dynamicApi };
};
