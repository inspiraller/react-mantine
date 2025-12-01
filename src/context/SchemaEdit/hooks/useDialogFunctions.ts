import {
  DynamicApiFunctions,
  NestedEditPath,
  THandleInputUpdate,
  THandleSuccess,
} from '@/types/functions';
import { useCallback, useRef, useState } from 'react';
import { useSchemaContext } from '../Schema.context';
import { PREFIX_TEMP_ID } from '@/util/prefillNestedArrayIds';

export interface PropsUseDialogFunctions {
  DataValue: Record<string, any>;
  handleClose: () => void;
  path: NestedEditPath;
  dynamicApiFunctions?: DynamicApiFunctions;
  handleApiSuccess: THandleSuccess;
}

export const useDialogFunctions = ({
  DataValue,
  path = [],
  dynamicApiFunctions,
  handleClose,
  handleApiSuccess,
}: PropsUseDialogFunctions) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const { handleUpdate } = useSchemaContext();
  const [error, setError] = useState<{ status: number; message: string }>();

  const [dialogInputValues, setDialogInputValues] = useState<
    Record<string, string | number | boolean>
  >({});

  const removeFromDialog = useCallback(() => {
    // Remove from dialog
    Object.keys(dialogInputValues ?? {}).map((key) => {
      setDialogInputValues((prev) => {
        const { [key]: _, ...remainder } = prev;
        return remainder;
      });
    });
  }, [dialogInputValues]);

  const handleDialogInputUpdate: THandleInputUpdate = ({
    DataKey: DataKeyToUpdate,
    DataValue: DataValueToUpdate,
  }) => {
    // DEBUG
    // console.log('DIALOG - handleInputUpdate', {
    //   currentPath,
    //   DataKeyToUpdate,
    //   DataValueToUpdate,
    // });
    setError(undefined);
    setDialogInputValues((prev) => {
      return { ...prev, [DataKeyToUpdate]: DataValueToUpdate };
    });
  };

  const handleCatchError = (err: any) => {
    const message = 'Error Saving';
    const status = err.status;
    setError({ status, message });

    if (dialogRef.current) {
      dialogRef.current.scrollTop = 0;
    }
  };
  const handleSave = () => {
    setError(undefined);
    if (dynamicApiFunctions) {
      // eslint-disable-next-line unused-imports/no-unused-vars
      const { id, order, ...dataUnChanged } = DataValue;

      const isTempId = String(id).indexOf(PREFIX_TEMP_ID) !== -1;
      if (id && !isTempId) {
        const dataToSave = { id, ...dataUnChanged, ...dialogInputValues };
        dynamicApiFunctions
          .handleUpdate(dataToSave)
          .then(() => {
            removeFromDialog();
            handleClose();
            handleApiSuccess({ id });
          })
          .catch(handleCatchError);
      } else {
        const dataToSave = { ...dataUnChanged, ...dialogInputValues };
        dynamicApiFunctions
          .handleCreate(dataToSave)
          .then(({ id: postId }) => {
            removeFromDialog();
            handleClose();
            handleApiSuccess({ id: postId });
          })
          .catch(handleCatchError);
      }
    } else {
      Object.entries(dialogInputValues ?? {}).map(([key, val]) => {
        const newPath = [...path, key];
        // DEBUG
        // console.log('handleSave()', { path, newPath, val });
        handleUpdate(newPath, val);
      });
      removeFromDialog();
      handleClose();
    }
  };

  const handleCancel = () => {
    removeFromDialog();
    handleClose();
  };

  return {
    handleSave,
    handleCancel,
    handleDialogInputUpdate,
    error,
    dialogInputValues,
    dialogRef,
  };
};
