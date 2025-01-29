import * as z from 'zod'

export const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, {
    message: 'Informe o nome da tarefa.',
  }),
  timer: z
    .number()
    .min(5, {
      message: 'Duração mínima de 5 minutos.',
    })
    .max(60, {
      message: 'Duração máximo de 60 minutos.',
    }),
})

export type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>
