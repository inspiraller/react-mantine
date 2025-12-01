// @ts-nocheck
import { z } from 'zod';

export const zodSchema = z.object({
  VITE_API_BASE_URL: z.string(),
  VITE_API_PROXY: z.string(),
  MODE: z.enum(['development', 'production']),
});

const validateEnv = () => {
  const env = import.meta.env;
  const validatedEnv = zodSchema.safeParse(env);
  if (!validatedEnv.success) {
    throw new Error(
      `Invalid env:
        ${Object.entries(validatedEnv.error.flatten().fieldErrors)
          .map(([k, v]) => `- ${k}: ${v}`)
          .join('\n')}
        `,
    );
  }
  return validatedEnv.data;
};

export const env = validateEnv();
