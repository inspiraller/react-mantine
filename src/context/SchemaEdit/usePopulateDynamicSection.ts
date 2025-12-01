import { useCallback, useEffect, useState } from 'react';
import { prefillNestedArrayIds } from '../../util/prefillNestedArrayIds';
import { PropsDataSchemaDefaultItems } from '../../dataSchema/dataSchema';
import { useDynamicApi } from './hooks/useDynamicApi';

interface Props {
  section?: PropsDataSchemaDefaultItems;
  setSection: React.Dispatch<React.SetStateAction<PropsDataSchemaDefaultItems>>;
  sectionLoading: boolean;
}
export const usePopulateDynamicSection = ({
  section,
  sectionLoading,
}: Props) => {
  const [sectionAsDynamic, setSectionAsDynamic] =
    useState<PropsDataSchemaDefaultItems>({} as PropsDataSchemaDefaultItems);

  const [enable, setEnable] = useState<boolean>(true);

  const { is_dynamic_api, type } = section ?? {};
  const isSection = section && Object.keys(section).length > 0;

  const { isLoadingGet, dynamicApi } = useDynamicApi({
    type,
    is_dynamic_api,
  });
  const dynamicApiTypesArray = dynamicApi?.items;

  const updateSectionFromMongo = useCallback(() => {
    setSectionAsDynamic(
      prefillNestedArrayIds(section as PropsDataSchemaDefaultItems),
    );
  }, [section]);

  // eslint-disable-next-line unused-imports/no-unused-vars
  const { items, ...topSection } = section ?? {}; // exclude items. Just get topSection

  const updateSectionFromApi = useCallback(() => {
    const sectionWithDynamicItems = prefillNestedArrayIds({
      ...topSection,
      items: dynamicApiTypesArray,
    });
    setSectionAsDynamic(sectionWithDynamicItems);
  }, [dynamicApiTypesArray, topSection]);

  useEffect(() => {
    if (isLoadingGet) {
      setEnable(true);
    }
  }, [isLoadingGet]);
  const isDynamicApiArrayLoaded = !!dynamicApiTypesArray;
  useEffect(() => {
    if (enable && !isLoadingGet && isSection && !sectionLoading) {
      if (!is_dynamic_api) {
        setEnable(false);
        updateSectionFromMongo();
      } else if (isDynamicApiArrayLoaded) {
        setEnable(false);
        updateSectionFromApi();
      }
    }
  }, [
    enable,
    isLoadingGet,
    sectionLoading, // We need this to re-trigger on new upload - to repopulate sectionAsDynamic
    isSection,
    is_dynamic_api,
    isDynamicApiArrayLoaded,
    updateSectionFromMongo,
    updateSectionFromApi,
    setEnable,
  ]);

  //const isRender =!isLoadingGet && isSection && (!is_dynamic_api || !!dynamicApiTypesArray);

  return {
    sectionAsDynamic,
    setSectionAsDynamic,
  };
};
