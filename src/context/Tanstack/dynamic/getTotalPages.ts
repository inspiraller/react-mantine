export const getTotalPages = (total: number, denominator: number) =>
  total ? Math.ceil(total / denominator) : 0;
