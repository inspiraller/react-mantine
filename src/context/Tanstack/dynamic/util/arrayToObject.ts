/**
 * Converts an array of objects into a single object (map)
 * where the key is specified by the key property name, and the value is the rest of the properties.
 *
 * @param items The array of objects to convert.
 * @param keyProp The property name (K) to use as the key for the resulting object (e.g., 'name').
 * @returns An object mapping the value of keyProp to the rest of the object's details,
 * excluding the key property itself (Omit<T, K>).
 */
export function arrayToObject<
  T extends Record<K, PropertyKey>,
  K extends keyof T,
>(items: T[], keyProp: K): Record<string, Omit<T, K>> {
  return items.reduce(
    (acc, item) => {
      // Dynamically extract the key value and the rest of the properties using destructuring
      const { [keyProp]: key, ...rest } = item;

      // Add the new key-value pair to the accumulator object
      // key is cast to string as it's used as an index
      (acc as any)[key] = rest;

      return acc;
    },
    {} as Record<string, Omit<T, K>>,
  );
}
// mergedPeople = [{name: 'x, ...}]
// eg: const peopleMap = arrayToObject(mergedPeople, 'name');
// output: {x: {...}}
