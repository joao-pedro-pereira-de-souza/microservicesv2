import zod from 'zod';


export const schema = zod.object({
  template_url: zod.string({ message: "Adicione o link url do arquivo pdf" }).url(),
});

export type schemaInterface = zod.infer<typeof schema>
