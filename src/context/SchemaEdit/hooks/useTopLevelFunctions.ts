import { useEffect, useState } from 'react';
import { THandleInputUpdate, THandleSuccess } from '@/types/functions';
import { queryClient } from '@/context/Tanstack/queryclient';
import { useSchemaContext } from '@/context/SchemaEdit/Schema.context';

export const useTopLevelFunctions = () => {
  const [idSaved, setIdSaved] = useState<string>();

  const handleApiSuccess: THandleSuccess = ({ id }) => {
    // invoke toast and invalidate tag to reload get
    queryClient.invalidateQueries({ queryKey: ['Items'] });
    setIdSaved(id);
  };

  useEffect(() => {
    if (idSaved) {
      window?.scrollTo(0, 0); // scroll to top
    }
  }, [idSaved]);

  const { handleUpdate } = useSchemaContext();

  const handleTopLevelInputUpdate: THandleInputUpdate = ({
    DataValue,
    currentPath,
  }) => {
    // DEBUG
    // console.log('ROOT - schemaupdate handle update - JUST SAVE!', {
    //   DataKey,
    //   DataValue,
    //   currentPath,
    // });

    handleUpdate(currentPath, DataValue);
  };

  return {
    idSaved,
    handleApiSuccess,
    setIdSaved,
    handleTopLevelInputUpdate,
  };
};
