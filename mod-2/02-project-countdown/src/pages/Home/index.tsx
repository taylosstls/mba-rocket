import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { differenceInSeconds } from 'date-fns'
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
  startDate: Date
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

  // Retornar o ciclo ativo do Array
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // Observa os campos de input (useEffect)
  const taskValue = watch('task')
  const isSubmitDisabled = !taskValue

  useEffect(() => {
    if (activeCycle) {
      setInterval(() => {
        setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
      }, 1000)
    }
  }, [activeCycle])

  // Função de criação de um novo ciclo
  function handleCreateNewCycle({ task, timer }: newCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task,
      timer,
      startDate: new Date()
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)

    reset()
  }

  // Divisão do tempo total do timer, convertido para segundos
  const totalTimerSeconds = activeCycle ? activeCycle.timer * 60 : 0

  // Tempo do Counter total - tempo atual
  const currentSeconds = activeCycle
    ? totalTimerSeconds - amountSecondsPassed
    : 0

  // total de minutos, arredondando sempre para baixo
  const minutesAmount = Math.floor(currentSeconds / 60)

  // total de segundos, considerando o resto da operação
  const secondsAmount = currentSeconds % 60

  // Exibição dos minutos, transformados em String
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

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
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </ContainerHome>
  )
}
