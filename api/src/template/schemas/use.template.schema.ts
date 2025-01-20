import zod from 'zod';


export const schema = zod.object({
   template_url: zod.string({ message: "Adicione o link url do arquivo pdf" }),
   variables: zod.object({}, {message: 'Adicione a lista de variáveis do pdf'})
});

export type schemaInterface = zod.infer<typeof schema>
