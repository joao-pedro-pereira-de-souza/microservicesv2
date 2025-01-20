import zod from 'zod';


export const schema = zod.object({
  id: zod.string().uuid(),
});

export type schemaInterface = zod.infer<typeof schema>
