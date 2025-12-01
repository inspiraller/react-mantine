export const getNameAndDetailsFromId = <Response extends object>(
  key: string, // domainName, entryName, schemaName, etc...
  dataFromId?: Response,
) => {
  const { [key as keyof typeof dataFromId]: _, ...details } =
    dataFromId ?? ({} as Response);

  return { name: key, details: dataFromId ? details : undefined };
};
