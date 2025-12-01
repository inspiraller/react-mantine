// Create an array of persons names
const getNamesArray = <T extends { results: any[] }>(
  key: string, // domainName, entryName, schemaName, etc...
  result: T[] | null,
) => {
  return result?.reduce((acc, cur) => {
    cur.results.forEach((item) => {
      const name = item[key as keyof typeof item];
      if (name) {
        acc.push(name);
      }
    });
    return acc;
  }, [] as string[]);
};
export default getNamesArray;
