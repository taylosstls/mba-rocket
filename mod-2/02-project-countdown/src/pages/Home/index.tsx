import { createContext, useState } from 'react'

import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { ContainerHome } from './styles'

import { CountdownButton } from '../../components/atoms/CountdownButton'

import { NewCycleForm } from '../../components/molecules/NewCycleForm'
import { Countdown } from '../../components/molecules/Countdown'

import { Cycle, CyclesContextType } from '../../interface/Cycle'

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, {
    message: 'Informe a tarefa.',
  }),
  timer: z
    .number()
    .min(5, {
      message: 'Seu Timer precisa ser de pelo menos 5 minutos.',
    })
    .max(60, {
      message: 'Seu Timer pode ser de até 60 minutos.',
    }),
})

type newCycleFormData = z.infer<typeof newCycleFormValidationSchema>

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      timer: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm

  // Observa os campos de input (useEffect)
  const taskValue = watch('task')
  const isSubmitDisabled = !taskValue

  // Retornar o ciclo ativo do Array
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // Anota a data e hora que o ciclo foi concluído
  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  // Função de criação de um novo ciclo
  function handleCreateNewCycle({ task, timer }: newCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task,
      timer,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setSecondsPassed(0)

    reset()
  }

  // Função de parar ciclo
  function handleInterruptCycle() {
    // Anota a data e hora que o ciclo foi interrompido
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    // Defina para que não tenha mais nenhum ciclo ativo
    setActiveCycleId(null)
  }

  return (
    <ContainerHome>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <CountdownButton variant="stop" onClick={handleInterruptCycle} />
        ) : (
          <CountdownButton variant="start" disabled={isSubmitDisabled} />
        )}
      </form>
    </ContainerHome>
  )
}
