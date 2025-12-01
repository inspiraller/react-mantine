export const IsObjectKeys = (
  value: unknown,
): value is Record<string, unknown> => {
  return (
    typeof value === 'object' && value !== null && Object.keys(value).length > 0
  );
};
