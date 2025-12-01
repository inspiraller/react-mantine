import React, { createContext } from 'react';

import {
  handleDataAdd,
  handleDataDelete,
  handleDataOrderPosition,
  handleDataUpdate,
} from '@/types/functions';
import { EditSchemaObject } from '@/editSchema/editSchemaTypes';
import { PropsDataSchemaDefaultItems } from '@/dataSchema/dataSchema';

interface SchemaContextType {
  editSchema: EditSchemaObject;
  section?: PropsDataSchemaDefaultItems; // all possible types: PropAllDataSchemaUnion;
  //dynamicApi?: DynamicApiItemAndFunctions;
  setSection: React.Dispatch<
    React.SetStateAction<PropsDataSchemaDefaultItems> // All possible types: PropAllDataSchemaUnion;
  >;
  sectionLoading?: boolean;
  setSectionLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isError?: boolean;
  handleAdd: handleDataAdd;
  handleDelete: handleDataDelete;
  handleUpdate: handleDataUpdate;
  handleOrderPosition: handleDataOrderPosition;
}

export const SchemaContext = createContext<SchemaContextType>({
  section: undefined,
  editSchema: {},
  //dynamicApi: {},
  setSectionLoading: () => {},
  setSection: () => {},
  handleAdd: () => {},
  handleDelete: () => {},
  handleUpdate: () => {},
  handleOrderPosition: () => {},
});

function useSchemaContext(): SchemaContextType {
  const context = React.useContext(SchemaContext);
  if (context === undefined) {
    throw new Error(
      'useSchemaContext must be used within a SchemaContextProvider',
    );
  }
  return context;
}

export { useSchemaContext };
