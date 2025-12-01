import React, { useMemo, useState } from 'react';

import {
  handleDataAdd,
  handleDataDelete,
  handleDataOrderPosition,
  handleDataUpdate,
} from '@/types/functions';
import { handleOrderPos } from '@/util/handleOrderPos';
import { SchemaContext } from './Schema.context';
import { PropsDataSchemaDefaultItems } from '@/dataSchema/dataSchema';
import {
  EditSchemaTypes,
  EditSchemaObject,
} from '@/editSchema/editSchemaTypes';
import { updateNested } from '@/util/updateNested';
import { addNested } from '@/util/addNested';
import { deleteNested } from '@/util/deleteNested';
import { editSchemaAll } from '@/editSchema/editSchemaAll';
import { usePopulateDynamicSection } from './usePopulateDynamicSection';

interface Props {
  children?: React.ReactNode;
  section?: PropsDataSchemaDefaultItems; // PropAllDataSchemaUnion;
}

const SchemaContextProvider = ({
  children,
  section: initialSection,
}: Props) => {
  const [sectionLoading, setSectionLoading] = useState<boolean>(false);
  const [section, setSection] = useState<PropsDataSchemaDefaultItems>(
    (initialSection || {}) as PropsDataSchemaDefaultItems,
  );

  const type = section?.type as EditSchemaTypes['SectionType'];
  const editSchema = useMemo(
    () => editSchemaAll[type] as EditSchemaObject,
    [type],
  );
  const { sectionAsDynamic, setSectionAsDynamic } = usePopulateDynamicSection({
    section,
    setSection,
    sectionLoading,
  });

  const handleUpdate: handleDataUpdate = (path, value) => {
    setSectionAsDynamic((prev: any) => {
      return updateNested(prev, path, value);
    });
  };

  const handleAdd: handleDataAdd = ({ path, is_dynamic_api }) => {
    setSectionAsDynamic((prev: any) => {
      return addNested(prev, path, is_dynamic_api);
    });
  };

  const handleDelete: handleDataDelete = (path, id) => {
    setSectionAsDynamic((prev: any) => {
      return deleteNested(prev, path, id);
    });
  };

  const handleOrderPosition: handleDataOrderPosition = (path, direction) => {
    setSectionAsDynamic((prev) => handleOrderPos({ prev, path, direction }));
  };

  return (
    <SchemaContext.Provider
      value={{
        editSchema,
        section: sectionAsDynamic,
        //dynamicApi,
        setSection,
        sectionLoading,
        setSectionLoading,
        handleAdd,
        handleDelete,
        handleUpdate,
        handleOrderPosition,
      }}
    >
      {children}
    </SchemaContext.Provider>
  );
};

export { SchemaContextProvider };
