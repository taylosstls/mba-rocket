import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Play } from 'phosphor-react'

import { zodResolver } from '@hookform/resolvers/zod'

import {
  ContainerHome,
  CountdownContainer,
  FormContainer,
  Separator,
  StartCountdownButton,
  TaskInput,
  TimerInput,
} from './styles'

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

interface Cycle {
  id: string
  task: string
  timer: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      timer: 0,
    },
  })

  function handleCreateNewCycle({ task, timer }: newCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task,
      timer,
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalTimerSeconds = activeCycle ? activeCycle.timer * 60 : 0
  const currentSeconds = activeCycle
    ? totalTimerSeconds - amountSecondsPassed
    : 0

  const minutesAmount = currentSeconds / 60

  const taskValue = watch('task')
  const isSubmitDisabled = !taskValue

  return (
    <ContainerHome>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="timer">durante</label>
          <TimerInput
            id="timer"
            type="number"
            // min={5}
            // max={60}
            step={5}
            placeholder="00"
            {...register('timer', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </ContainerHome>
  )
}
